import styled from "styled-components";

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
  gap: 15px;
`;
const Label = styled.label`
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
  display: flex;
  gap: 3px;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;
const TicketForm = () => {
  return (
    <TicketFormContainer>
      <Header>The Eras Party Ticket | Chapter 2</Header>
      <Form>
        <InputWrapper>
          <Label>Name: </Label>
          <Input type="text" id="name" name="name" />
        </InputWrapper>
        <InputWrapper>
          <Label>Year of Birth: </Label>
          <Input type="text" id="yearOfBirth" name="yearOfBirth" />
        </InputWrapper>
        <InputWrapper>
          <Label>Email: </Label>
          <Input type="email" id="email" name="email" />
        </InputWrapper>
        <InputWrapper>
          <Label>Phone: </Label>
          <Input type="phone" id="phone" name="phone" />
        </InputWrapper>
        <InputWrapper>
          <Label>Facebook: </Label>
          <Input type="text" id="fb" name="fb" />
        </InputWrapper>
        <InputWrapper>
          <Label>Quantity: </Label>
          <Input type="text" id="quantity" name="quantity" />
        </InputWrapper>
        <InputWrapper>
          <Label>Transfer Information: </Label>
          <Input type="text" id="transferInfo" name="transferInfo" />
        </InputWrapper>
      </Form>
    </TicketFormContainer>
  );
};
export default TicketForm;
