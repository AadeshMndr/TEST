import { Fragment } from "react";
import Link from "next/link";

import AuthForm from "@/components/auth/AuthForm";

export default function Home() {
  return (
    <Fragment>
      <h2 style={{textAlign: "center", fontSize: "2rem", marginTop: "90px"}}>Welcome to Homeco!</h2>
      <AuthForm />
    </Fragment>
  )
}
