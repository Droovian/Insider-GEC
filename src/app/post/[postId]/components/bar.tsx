import React from 'react'
import { Textarea } from "@/components/ui/textarea";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  import { SlOptions } from "react-icons/sl";
  import { Loader2 } from "lucide-react";
  import { Separator } from "@/components/ui/separator"
  import { Button } from "@/components/ui/button";
import Voting from './Voting';


const Bar = () => {
  return (
    <>
    <div className='flex space-x-2'>
                <Voting/>
                <div className="flex right-0">
                  <Drawer>
                    <DrawerTrigger>
                      <SlOptions />
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle className="text-center">Why do you want to report this?</DrawerTitle>
                      </DrawerHeader>
                      <Textarea className="w-1/2 mx-auto" />
                      <DrawerFooter>
                        <Button variant='default' className="mx-auto" size='sm'>Submit</Button>
                        <DrawerClose>
                          <Button variant="outline" size='sm'>Cancel</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </div>
              </div>
    </>
  )
}

export default Bar