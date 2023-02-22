import Link from "next/link";
import { useRouter } from "next/router";

const NavLink = ({ children, id, className, href, activeClassName="" }) => {
    const router = useRouter();

    const classes = `${className || ""}${router.pathname === href ? activeClassName : ""}`;

    return (
        <Link href={href} className={classes} id={id}> {children} </Link>
    );
}

export default NavLink;