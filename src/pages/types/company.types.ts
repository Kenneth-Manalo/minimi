import { Dispatch, SetStateAction } from "react"

export interface CompanyType {
    id: number
    name: string
    img: string
}

export interface CompanyProps {
    company: CompanyType
}