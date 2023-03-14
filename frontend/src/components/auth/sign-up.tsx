import React, { useState } from "react"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Input, InputGroup, InputRightAddon, InputRightElement } from "@chakra-ui/input"
import { Button, VStack } from "@chakra-ui/react"

const SignUp : React.FC = () => {

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [pic, setPic] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const [confirmShow, setConfirmShow] = useState<boolean>(false);

    const handleShowPassoword = () => setShow(!show);
    const handleConfirmShowPassword = () => setConfirmShow(!confirmShow);

    const postDetails = (pics: string) => {}

    const submitHandler = () => {}

    return (
        <VStack spacing="5px" gap={4}>
            <FormControl id="full-name" isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                    value={name}
                    placeholder="Enter Your Name"
                    onChange={e => setName(e.target.value)}
                />
            </FormControl>
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
            <FormControl id="password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        value={confirmPassword}
                        type={confirmShow ? "text": "password"}
                        placeholder="Confirm Password"
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleConfirmShowPassword}>
                            {confirmShow ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id="pic">
                <FormLabel>Upload Your Picture (Optional)</FormLabel>
                <Input
                    type="file"
                    p={1.5}
                    accept="image/*"
                    onChange={(e: any) => postDetails(e.target.files[0])}
                />
            </FormControl>

            <Button
                colorScheme="teal"
                width="100%"
                style={{ marginTop: 15}}
                onClick={submitHandler}
            >
                Sign Up
            </Button>
        </VStack>
    )
}

export default SignUp
