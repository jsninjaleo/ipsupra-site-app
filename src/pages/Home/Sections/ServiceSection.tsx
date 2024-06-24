import { useEffect, useState } from 'react'
import { urlFor } from 'sanityClient';
import { getSanityData } from 'utils/getSanityData';

export const Service: React.FC = () => {
  const [serviceData, setServiceData] = useState<any>({
    title: '',
    mainText: '',
    mainImage: '',
    buttonText: '',
    footerImage: '',
    experienceList: [],
    bottomLeftText: '',
    bottomRightText: '',
    experienceTitle: '',
  });

  useEffect(() => {
    const CONTENT_QUERY = `*[_type == "serviceSection"] {
      title,
      mainText,
      mainImage,
      buttonText,
      bottomLeftText,
      bottomRightText,
      experienceTitle,
      experienceList[]{
        icon,
        title,
        mainText
      },
      footerImage
    }[0]`;
    
    getSanityData(CONTENT_QUERY).then(content => setServiceData(content));
  }, []);

  return (
    <>
      <div className='container mx-auto max-lg:px-10 max-sm:px-5 pt-24'>
        <div className='grid grid-cols-12'>
          <div className='col-span-4 max-md:col-span-12'>
            <img
              alt='MainImage'
              className='w-full h-full'
              src={serviceData.mainImage !== '' ? 
                urlFor(serviceData.mainImage).url() : 
                ''
              } 
            />
          </div>
          <div className='col-span-8 max-md:col-span-12'>
            <div className='max-md:py-5 max-md:text-center font-goudy font-medium text-5xl max-lg:text-4xl max-md:text-3xl max-sm:text-2xl tracking-tight'>
              {serviceData.title}
            </div>
            <div className='font-context font-normal text-xl max-md:text-base max-sm:text-sm leading-6 tracking-tight pt-10 max-md:py-1'>
              {serviceData.mainText}
            </div>
            <div className='grid grid-cols-2 gap-2 pt-7'>
              <div className='font-context font-normal text-gray-600 text-base max-sm:text-xs leading-5 tracking-tight max-sm:pb-3 max-sm:col-span-2'>
                {serviceData.bottomLeftText}
              </div>
              <div className='font-context font-normal text-gray-600 text-base max-sm:text-xs leading-5 tracking-tight max-sm:col-span-2'>
                {serviceData.bottomRightText}
              </div>
              <div className='col-span-2 w-full max-sm:flex justify-center mt-10 max-sm:mt-5'>
                <div className='text-center w-fit rounded cursor-pointer text-xl max-sm:text-base bg-yellow-500 text-teal-900 font-common font-normal px-5 max-sm:px-4 py-3'>
                  {serviceData.buttonText}
                </div>
              </div>
            </div>
          </div>
          <div className='max-md:text-center col-span-12 font-goudy font-medium text-5xl max-lg:text-4xl max-md:text-3xl max-sm:text-2xl tracking-tight pt-24 max-md:pt-10'>
            {serviceData.experienceTitle}
          </div>
          <div className='col-span-12 pt-6'>
            <div className='grid grid-cols-12 max-md:grid-cols-8 max-sm:grid-cols-4 gap-y-16 max-md:gap-y-8 gap-x-3'>
              {serviceData.experienceList.map((
                item: {
                  title: string, 
                  mainText: string, 
                  icon: string
                }, index: number
              ) => {
                return (
                  <div key={index} className='col-span-4'>
                    <div className='flex max-sm:justify-center items-center gap-4'>
                      <img 
                        alt='Experience Icon'
                        src={urlFor(item.icon).url()}
                      />
                      <div className='flex justify-center items-center col-span-10 font-goudy font-medium text-xl max-lg:text-lg max-md:text-base max-sm:text-sm leading-5 tracking-tight'>
                        {item.title}
                      </div>
                    </div>
                    <div className='pt-4 max-sm:text-center font-context font-normal text-gray-600 text-base max-sm:text-xs leading-5 tracking-tight'>
                      {item.mainText}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='col-span-12 pt-24 max-sm:pt-12 '>
            <img
              alt='Experience Footer' 
              className='w-full h-full'
              src={serviceData.footerImage !== '' ? 
                urlFor(serviceData.footerImage).url() : 
                ''
              }
            />
          </div>
        </div>
      </div>
    </>
  )
}
