import styled from "styled-components";

const TicketFormContainer = styled.div`
  width: 100%;
  padding-top: 30px;
`;
const Header = styled.h2``;
const Form = styled.form``;
const Label = styled.label`
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
`;
const TicketForm = () => {
  return (
    <TicketFormContainer>
      <Header>The Eras Party Ticket | Chapter 2</Header>
      <Form>
        <Label htmlFor="name">Name</Label>
      </Form>
    </TicketFormContainer>
  );
};
export default TicketForm;
