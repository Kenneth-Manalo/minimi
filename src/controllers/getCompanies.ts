import { CompanyType } from "@/pages/types/company.types"

export const getCompanies = async(offset: number, limit: number) => {
    try{
        const url = `http://localhost:3000/api/companies?offset=${offset}&limit=${limit}`
        const res = await fetch(url)
        const data = (await res.json()) as CompanyType[]
        return data
    } catch (error: unknown) {
        console.log(error)
        throw new Error(`An error occured: ${error}`)
    }    
}