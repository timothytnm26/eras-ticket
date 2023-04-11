import { useRef, useState } from "react";
import styled from "styled-components";
import { FORM_LINK } from "../../constants/form";
const TicketFormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
`;
const Header = styled.h2`
  height: 50px;
`;
const Form = styled.form`
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;
const Label = styled.label`
  display: flex;
  gap: 3px;
  flex-direction: column;
  align-items: flex-start;

  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
`;
const Input = styled.input`
  padding: 5px;
  height: 20px;
  border: 1px solid var(--era-color-1);
  color: var(--era-color-2);
  background-color: var(--era-color-1);
  width: 100%;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  &:focus {
    outline: none;
  }
`;
const InputWrapper = styled.div`
  width: 100%;
`;
const Submit = styled.input`
  margin-top: 10px;
  height: 35px;
  width: 100px;
  padding: 5px;
  border: 1px solid var(--era-color-2);
  background-color: var(--era-color-1);
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 1.2rem;
  color: var(--era-color-2);
  cursor: pointer;
`;
const TicketForm = () => {
  const [inputs, setInputs] = useState({});
  const formRef = useRef(null);
  const scriptUrl = "get yours by practicing";
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formELe = document.getElementById("ticketForm");
    const form = new FormData(formELe);
fetch(
  { FORM_LINK },
  {
    method: "POST",
    body: form,
  }
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
  };

  return (
    <TicketFormContainer>
      <Header>The Eras Party Ticket | Chapter 2</Header>
      <Form ref={formRef} onSubmit={handleSubmit} id="ticketForm">
        <InputWrapper>
          <Label>
            Name:{" "}
            <Input
              type="text"
              id="name"
              name="name"
              value={inputs.name || ""}
              onChange={handleChange}
            />
          </Label>
        </InputWrapper>
        <InputWrapper>
          <Label>Year of Birth: </Label>
          <Input
            type="number"
            id="yearOfBirth"
            name="yearOfBirth"
            value={inputs.yearOfBirth || ""}
            onChange={handleChange}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Email: </Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={inputs.email || ""}
            onChange={handleChange}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Phone: </Label>
          <Input
            type="phone"
            id="phone"
            name="phone"
            value={inputs.phone || ""}
            onChange={handleChange}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Facebook: </Label>
          <Input
            type="text"
            id="fb"
            name="fb"
            value={inputs.fb || ""}
            onChange={handleChange}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Quantity: </Label>
          <Input
            type="number"
            id="quantity"
            name="quantity"
            value={inputs.quantity || ""}
            onChange={handleChange}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Transfer Information: </Label>
          <Input
            type="text"
            id="transferInfo"
            name="transferInfo"
            value={inputs.transferInfo || ""}
            onChange={handleChange}
          />
        </InputWrapper>
        <Submit type="submit" value="" Book />
      </Form>
    </TicketFormContainer>
  );
};
export default TicketForm;
