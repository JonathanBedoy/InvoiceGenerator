// import React, {  } from 'react';
import { jsPDF } from "jspdf";
// import Invoice from '../Invoice/Invoice';
// import { withRouter } from 'react-router-dom';
import html2canvas from 'html2canvas';
// import { Col, Container, Row } from 'react-bootstrap';
// import Button from '../../components/UI/Button/Button';
// import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: 'white'
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1
//   }
// });





// Create Document Component
// const MyDocument = (props) => {

  // const [showInvoice, setShowInvoice] = useState(true)

  // console.log(props.match.params.id)
  
  export const renderPdf = () => {
    
    // const vp = document.getElementById("viewportMeta").getAttribute("content");

    // document.getElementById("viewportMeta").setAttribute("content", "width=1920");
    
    // get the element we would like to render as pdf
    const input = document.getElementById('invoiceRender');
    // const height = input.getAttribute("height")

    // make the element into a png, with the same width/height as
      // a standard letter size
    html2canvas(input, {width: 793, height: 1122})
      .then((canvas) => {
        // document.body.appendChild( canvas )
        // console.log(canvas)
        const imgData = canvas.toDataURL('image/png');
        // make a blank pdf
        const pdf = new jsPDF("p", "mm", "a4");
        const height = pdf.internal.pageSize.getHeight()
        const width = pdf.internal.pageSize.getWidth()
        // add the image of the element to blank pdf, with 
          // the same size as the pdf doc
        pdf.addImage(imgData, 'JPEG', 0, 0,width, height);
        // pdf.output('dataurlnewwindow');
        // make client download copy of pdf
        // pdf.save("download.pdf");
        window.open(pdf.output('bloburl'), '_blank');
      }).then( () => {
        // document.getElementById("viewportMeta").setAttribute("content", vp);
        // setShowInvoice(false)
      })
  }

//   // if (props.location.pathname === '/pdf') {

    


//   //   // const doc = new jsPDF();

//   //   // doc.text('ello therer', 10, 10)
//   //   // doc.save('pracin.pdf')
//   // }


//   return (
//     <Container className={`mt-5`}>
//       <Row className='d-flex justify-content-center'>
//         <Col className='d-flex justify-content-center'>
//           <Button type={'info'} click={renderPdf} >Download</Button>
//         </Col>
//       </Row>
      
//       {/* <Invoice id={props.match.params.id} /> */}
//       {/* {showInvoice ? <Invoice id={props.match.params.id} /> : false} */}

//     </Container>
//   )
//   // <PDFViewer>

//   //   <Document>
//   //     <Page size="LETTER" style={styles.page}>
//   //       <View style={styles.section}>
//   //         <Text>Section #1</Text>
//   //       </View>
//   //       <View style={styles.section}>
//   //         <Text>Section #2</Text>
//   //       </View>
//   //     </Page>
//   //   </Document>
//   // </PDFViewer>
// };

// export default withRouter(MyDocument);