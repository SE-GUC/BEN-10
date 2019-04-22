import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter color="blue" className="font-small pt-4 mt-4" style={{color:"blue",border:"1px solid black"}}>
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://lirtenhub.herokuapp.com/">LirtenHub.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;