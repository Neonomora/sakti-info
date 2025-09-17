import GuestNavbar from "@/components/GuestNavbar";

export default function Layout({children}) {
    return(
        <>
        <GuestNavbar/>
        {children}
        </>
    )
}