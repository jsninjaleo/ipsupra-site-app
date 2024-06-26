import { useEffect, useState } from 'react'
import { urlFor } from 'sanityClient';
import { getSanityData } from 'utils/getSanityData';
import { contactClient } from 'utils/contactClient';
import { isValidEmail } from 'utils/validations';

export const ContactUs: React.FC = () => {
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [contactUsData, setContactUsData] = useState<any>({
    title: '',
    contactInfo: [],
    backgroundImage: '',
    universityPhoto: '',
    submitButtonText: '',
  });

  const [formData, setFormData] = useState<Record<string, any>>({
    name: '',
    email: '',
    organization: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const resetForm = (): void => {
    setFormData({
      name: '',
      email: '',
      organization: '',
      message: ''
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    if(!isValidEmail(formData.email.trim())){
      setEmailValid(true);
      return;
    }

    await contactClient(form);
    setEmailValid(false);
    resetForm();
  };

  useEffect(() => {
    const CONTENT_QUERY = `*[_type == "contactUsSection"] {
      title,
      backgroundImage,
      universityPhoto,
      submitButtonText,
      contactInfo[]{
        title,
        information,
      },
    }[0]`;
    
    getSanityData(CONTENT_QUERY).then(content => setContactUsData(content));
  }, []);

  return (
    <div 
      className='bg-cover bg-center w-full'
      style={{ backgroundImage: `url(${contactUsData.backgroundImage !== '' ? 
        urlFor(contactUsData.backgroundImage).url() : 
        ''
      }`}}
    >
      <div className='container mx-auto max-lg:px-10 max-sm:px-5 py-12'>
        <div className='flex justify-center items-center text-center font-goudy font-medium text-5xl max-xl:text-4xl max-sm:text-2xl leading-10'>
          {contactUsData.title}
        </div>
        <div className='grid grid-cols-2 max-sm:grid-cols-1'>
          <form onSubmit={handleSubmit}>
            <div className='pb-5'>
              <div className='p-2 font-context font-bold text-base max-sm:text-xs leading-5'>
                NAME
              </div>
              <input
                className='w-full border border-contact-color placeholder-contact-color px-5 py-2'
                placeholder='Enter your name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
              /> 
            </div>
            <div className='pb-5 relative'>
              <div className='p-2 font-context font-bold text-base max-sm:text-xs leading-5'>
                EMAIL
              </div>
              <input
                className='w-full border border-contact-color placeholder-contact-color px-5 py-2'
                placeholder='Enter your email address'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
              {
                emailValid && 
                <div className='p-1 absolute right-0 -bottom-1 font-context font-normal text-sm text-red-500 max-sm:text-xs leading-5'>
                  Wrong format
                </div> 
              }
            </div>
            <div className='pb-5'>
              <div className='p-2 font-context font-bold text-base max-sm:text-xs leading-5'>
                ORGANIZATION
              </div>
              <input
                className='w-full border border-contact-color placeholder-contact-color px-5 py-2'
                placeholder='Enter your organization'
                name='organization'
                value={formData.organization}
                onChange={handleChange}
                required
              /> 
            </div>
            <div className='pb-5'>
              <div className='p-2 font-context font-bold text-base max-sm:text-xs leading-5'>
                MESSAGE
              </div>
              <textarea
                className='resize-none w-full h-52 border border-contact-color placeholder-contact-color px-5 py-2'
                placeholder='Your message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                required
              /> 
            </div>
            <button 
              className='w-full font-context font-bold bg-contactbutton-color text-white text-base leading-4 py-4' 
              type='submit'
            >
              {contactUsData.submitButtonText}
            </button>
          </form>
          <div className='flex justify-center max-xl:p-10 max-sm:p-0'>
            <div>
              {contactUsData.contactInfo.map((info: {
                title: string,
                information: string[],
              }, index: number) => {
                return (
                  <div key={index}>
                    <div className='max-md:text-center pt-16 max-sm:pt-10 pb-5 font-context text-yellow-color font-bold text-base max-sm:text-xs leading-8 tracking-tighter'>
                      {info.title}
                    </div>
                    {info.information.map((data:string, index) => {
                      return (
                        <div 
                          key={index}
                          className='max-md:text-center font-context font-normal text-base max-sm:text-xs leading-5'
                        >
                          {data}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
              <div className='pt-10'>
                <img
                  alt='UniversityPhoto'
                  className='w-full'
                  src={contactUsData.universityPhoto !== '' ? 
                    urlFor(contactUsData.universityPhoto).url() : 
                    ''
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
