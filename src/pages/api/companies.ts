import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from 'fs';
import { CompanyType } from '../types/company.types'

const getCompanyList = async (offset: number, limit: number): Promise<CompanyType[]> => {
  const file = await fs.readFile(process.cwd() + '/mock_data/companies.json', 'utf8');
  const data = JSON.parse(file);

  const splitData: CompanyType[] = [];
  
  let i = Number(offset) + 1;
  data.forEach((company: CompanyType) => {
    if (company.id === i) {
      if (splitData.length < limit) {
        splitData.push(company);
        i++;
      }
    }
  })
    
  return splitData;
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const offset = req.query.offset as unknown as number;
    const limit = req.query.limit as unknown as number;
    const result = await getCompanyList(offset, limit)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}