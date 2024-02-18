import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogin } from "./useLogin";
import useRecover from "./useRecover";


function LoginForm() {
  const [email, setEmail] = useState("ayush.test@example.com");
  const [password, setPassword] = useState("ayushdhawan");
  const {login, isLoggingIn} = useLogin();
  const {recoverPassword, isLoading} = useRecover();

  function handleSubmit(e) {
    e.preventDefault();
    if(!email || !password) return;
    login({email, password}, {
      onSettled: () => {
        setEmail("");
        setPassword("");
      }
    })
  }

  return (
<>
<Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoggingIn}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoggingIn}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoggingIn}>
          {!isLoggingIn ? "Login" : <SpinnerMini /> }
          </Button> 
      </FormRowVertical>
    </Form>
    <a onClick={() => recoverPassword({email})} style={{textAlign: 'center', fontSize: '1.5rem', color: 'var(--color-brand-600)', cursor: 'pointer'}}>forgot password?</a>
</>
  );
}

export default LoginForm;
