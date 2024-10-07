import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { CompanyType } from '@/pages/types/company.types';
import { 
  Button, 
  CheckboxGroup, 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Spinner, 
  useDisclosure
} from "@nextui-org/react";
import CompanyCard from '@/components/CompanyCard';
import { getCompanies } from '@/controllers/getCompanies';

const NUMBER_OF_COMPANIES_TO_FETCH = 15
let initialCompanies: CompanyType[] = []

export default function CompanyList() {
  const [offset, setOffset] = useState<number>(0)
  const [companies, setCompanies] = useState<CompanyType[]>(initialCompanies)
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const [selected, setSelected] = useState<string[]>([]);
  const { ref, inView } = useInView()
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const initCompanies = async () => {
    initialCompanies = await getCompanies(0, NUMBER_OF_COMPANIES_TO_FETCH) 
    return initialCompanies
  }

  const loadCompanies = async () => {
    if (hasMoreData) {
      const apiCompanies = await getCompanies(offset, NUMBER_OF_COMPANIES_TO_FETCH)
      console.log(apiCompanies)
      
      if (apiCompanies.length === 0) setHasMoreData(false)
      
      setCompanies(companies => [...companies, ...apiCompanies])
      setOffset(offset => offset + NUMBER_OF_COMPANIES_TO_FETCH)
    }
  }

  const removeData = (ids: string[]) => {
    const newList = companies.filter(company => !selected.find(id => (Number(id) === company.id) ))
    setCompanies(newList)
  }

  useEffect(() => {
    initCompanies()
  }, [])

  useEffect(() => {
    if (inView && hasMoreData) {
      loadCompanies()
    }
  }, [inView, hasMoreData])

  if (!companies) return <div className="flex justify-center"><p>No data to load</p></div>
  
  return (
    <>
      <CheckboxGroup
        color="danger"
        value={selected}
        onValueChange={setSelected}
      >
        <div className="gap-5 grid grid-cols-2 sm:grid-cols-5">
          {companies.map((company, index) => (
            <CompanyCard key={index} company={company} />
          ))}
        </div>
      </CheckboxGroup>  
    
      <div className="flex gap-6 pb-10 flex-wrap items-center justify-center">
          {(hasMoreData && <div ref={ref}><Spinner label="Loading..." color="warning" /></div>)}
      </div>
      <div className="fixed bottom-10 right-0 mb-4 mr-4 p-4 flex items-center z-10">
          <Button color="danger" size="lg" onPress={onOpen}>Delete Data</Button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Remove Data</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to remove the data of the following selected companies?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>Cancel</Button>
                <Button color="primary" onClick={() => {removeData(selected)}} onPress={onClose}>Proceed</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}