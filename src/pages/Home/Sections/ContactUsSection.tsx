import { useEffect, useState } from 'react'
import { urlFor } from 'sanityClient';
import { getSanityData } from 'utils/getSanityData';

export const ContactUs: React.FC = () => {
  const [contactUsData, setContactUsData] = useState<any>({
    title: '',
    contactInfo: [],
    inputTagList: [],
    backgroundImage: '',
    universityPhoto: '',
    submitButtonText: '',
  });

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
      inputTagList[]{
        type,
        title,
        placeHolder
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
          <div>
            {contactUsData.inputTagList.map((inputTag: {
              type: string,
              title: string,
              placeHolder: string,
            }, index: number) => {
              return (
                <div 
                  key={index}
                  className='pb-5' 
                >
                  <div className='p-2 font-context font-bold text-base max-sm:text-xs leading-5'>
                    {inputTag.title}
                  </div>
                  {inputTag.type === 'input' ? 
                    <input
                      className='w-full border border-contact-color placeholder-contact-color px-5 py-2'
                      placeholder={inputTag.placeHolder}
                    /> : 
                    <textarea 
                      className='resize-none w-full h-52 border border-contact-color placeholder-contact-color px-5 py-2'
                      placeholder={inputTag.placeHolder}
                    />
                  }
                </div>
              )
            })}
            <button 
              className='w-full font-context font-bold bg-contactbutton-color text-white text-base leading-4 py-4' 
              type='submit'
            >
              {contactUsData.submitButtonText}
            </button>
          </div>
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
