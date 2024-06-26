import emailjs from 'emailjs-com'
import Swal from 'sweetalert2';

const SERVICE_ID = "service_2gsiho5";
const TEMPLATE_ID = "template_kxbnj3g";
const PUBLIC_KEY = "QkqRFvN1CnbNMsGjo";

export async function contactClient(form: any) {
  emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY)
    .then((result) => {
      Swal.fire({
        icon: 'success',
        title: 'Message Sent Successfully'
      })
    }, (error) => {
      Swal.fire({
        icon:'error',
        title: 'Ooops, something went wrong',
        text: error.text,
      })
    });
  return ;
}