import {Card, CardBody, CardFooter, Checkbox, Image} from "@nextui-org/react"
import { CompanyProps } from "@/pages/types/company.types"

export default function CompanyCard({ company }: CompanyProps) {
    return (
        <Card shadow="sm">
            <CardBody className="overflow-visible p-2 pt-5">
                <Image
                    isZoomed
                    radius="lg"
                    width="100%"
                    alt={company.name}
                    className="w-full object-cover h-[50%] p-3"
                    src={company.img}
                />
            </CardBody>
            <CardFooter className="text-small justify-between">
                <b>{company.name}</b>
                <Checkbox size="sm" radius="md" value={String(company.id)}></Checkbox>
            </CardFooter>
        </Card>
    )
}