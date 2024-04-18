import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { SlOptions } from "react-icons/sl"
  
  export function DropdownMenuDemo() {
    return (<>
    <div className="flex items-center">
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost">
                <SlOptions />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-8">
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <Button variant='ghost' size='sm'>
                        <Link href='/api/auth/signin'>Login</Link>
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Button variant='ghost' size='sm'>
                        <Link href='/signup'>Sign Up</Link>
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Button variant='ghost' size='sm'>
                        <Link href='/team'>Team</Link>
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
    </div>

    </>
    )
  }