import React, { useState } from "react"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { Button, VStack } from "@chakra-ui/react"

const Login : React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)

    const handleShowPassoword = () => setShow(!show);

    const submitHandler = () => {}

    return (
        <VStack spacing="5px" gap={4}>
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    value={email}
                    placeholder="Enter Email"
                    onChange={e => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        value={password}
                        type={show ? "text": "password"}
                        placeholder="Enter Password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowPassoword}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                colorScheme="teal"
                width="100%"
                style={{ marginTop: 15}}
                onClick={submitHandler}
            >
              Login
            </Button>
            <Button
                variant="solid"
                colorScheme="gray"
                width="100%"
                style={{ marginTop: 2}}
                onClick={() => {
                  setEmail("guest@example.com")
                  setPassword("123456")
                }}
            >
              Login as Guest
            </Button>
        </VStack>
    )
}

export default Login
