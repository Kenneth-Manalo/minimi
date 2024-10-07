import '@testing-library/jest-dom'
import { CompanyType } from '@/pages/types/company.types'
import { getCompanies } from '@/controllers/getCompanies'

const MOCK_COMPANIES: CompanyType[] = [
  { "id": 1, "name": "Company A", "img": "/images/companyA.png" },
  { "id": 2, "name": "Company B", "img": "/images/companyB.png" },
  { "id": 3, "name": "Company C", "img": "/images/companyC.png" },
  { "id": 4, "name": "Company D", "img": "/images/companyD.png" },
  { "id": 5, "name": "Company E", "img": "/images/companyE.png" },
  { "id": 6, "name": "Company F", "img": "/images/companyF.png" },
  { "id": 7, "name": "Company G", "img": "/images/companyG.png" },
  { "id": 8, "name": "Company H", "img": "/images/companyH.png" },
  { "id": 9, "name": "Company I", "img": "/images/companyI.png" },
  { "id": 10, "name": "Company J", "img": "/images/companyJ.png" },
  { "id": 11, "name": "Company K", "img": "/images/companyK.png" },
  { "id": 12, "name": "Company L", "img": "/images/companyL.png" },
  { "id": 13, "name": "Company M", "img": "/images/companyM.png" },
  { "id": 14, "name": "Company N", "img": "/images/companyN.png" },
  { "id": 15, "name": "Company O", "img": "/images/companyO.png" },
]

const companiesFetchMock = (data: CompanyType[]) => jest.spyOn(global, "fetch").mockImplementation( 
  jest.fn(
    () => Promise.resolve({ json: () => Promise.resolve(data), 
  }), 
) as jest.Mock )

describe("Dashboard that display a list of companies", () => {
  
  beforeEach(() => {
    jest.restoreAllMocks()
  })
  
  it('should initially fetch 15 companies', async() => {
    const fetchMock = companiesFetchMock(MOCK_COMPANIES)
    const url = "http://localhost:3000/api/companies?offset=0&limit=15"
    const companies = await getCompanies(0, 15)

    expect(fetchMock).toHaveBeenCalled()
    expect(fetchMock).toHaveBeenCalledWith(url)
    expect(companies).toBeInstanceOf(Array)
    expect(companies.length).toBe(15)
    expect(companies).toEqual(MOCK_COMPANIES)
  }) 

  it('should return an empty array if no companies are found', async() => {
    const fetchMock = companiesFetchMock([])
    const url = "http://localhost:3000/api/companies?offset=0&limit=0"
    const companies = await getCompanies(0, 0)
    
    expect(fetchMock).toHaveBeenCalled()
    expect(fetchMock).toHaveBeenCalledWith(url)
    expect(companies).toBeInstanceOf(Array)
    expect(companies.length).toBe(0)
    expect(companies).toEqual([])
  })

})