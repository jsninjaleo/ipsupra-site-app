import { useEffect, useState } from 'react'
import { urlFor } from 'sanityClient';
import { getSanityData } from 'utils/getSanityData';

export const Admin: React.FC = () => {
  const [adminData, setAdminData] = useState<any>({
    photo: '',
    awards: [],
    awardTitle: '',
    publications: [],
    trainingData: [],
    trainingTitle: '',
    administration: [],
    publicationIcon: '',
    publicationTitle: '',
    professionalTitle: '',
    professionalOrganizations: []
  });

  useEffect(() => {
    const CONTENT_QUERY = `*[_type == "adminSection"] {
      photo,
      awards,
      awardTitle,
      publications,
      trainingData,
      trainingTitle,
      administration,
      publicationIcon,
      publicationTitle,
      professionalTitle,
      administrationTitle,
      professionalOrganizations,
    }[0]`;
    
    getSanityData(CONTENT_QUERY).then(content => setAdminData(content));
  }, []);

  return (
    <>
      <div className='container mx-auto max-lg:px-10 max-sm:px-5 py-2 max-sm:pt-12 max-sm:text-center'>
        <div className='grid grid-cols-2 max-xl:grid-cols-1 gap-2 pb-2'>
          <div className='bg-training-color py-6 px-10 max-sm:px-5'>
            <div className='pt-7 font-goudy font-medium text-4xl leading-10 max-sm:text-2xl tracking-tight'>
              {adminData.trainingTitle}
            </div>
            {adminData.trainingData.map((
              organization: {
                title: string,
                data: string[]
              }, index: number
            ) => {
              return (
                <div 
                  key={index}
                >
                  <div className='pt-5 font-context text-amber-500 font-bold text-base max-sm:text-xs leading-8 tracking-tighter'>
                    {organization.title}
                  </div>
                  {organization.data.map((mainText, index) => {
                    return (
                      <span 
                        key={index}
                        className='font-context font-normal text-base max-sm:text-xs leading-8 tracking-tighter'
                      >
                        {mainText}
                      </span>
                    )
                  })}
                </div>
              )
            })}
            <div className='pt-7 max-sm:pb-5 font-context text-amber-500 font-bold text-base max-sm:text-xs leading-8 tracking-tighter'>
              {adminData.professionalTitle}
            </div>
            <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-1 w-full h-fit'>
              {adminData.professionalOrganizations.map((
                organizationData:{
                  period: string,
                  organization: string,
                }, 
                index:number
              ) => {
                return (
                  <div 
                    key={index}
                    className='pb-5 w-full'
                  >
                    <div className='font-context font-bold text-base max-sm:text-xs leading-8 tracking-tighter'>
                      {organizationData.period}
                    </div>
                    <div className='font-context font-normal text-base max-sm:text-xs leading-8 tracking-tighter'>
                      {organizationData.organization}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='h-full flex flex-col'>
            <div className='pb-3'>
              <img 
                alt='AdminPhoto'
                className='h-full w-full'
                src={adminData.photo !== '' ? 
                  urlFor(adminData.photo).url() : 
                  ''
                }
              />
            </div>
            <div className='bg-amber-400 py-6 px-8 max-sm:px-5 flex-1'>
              <div className='max-sm:text-center text-white font-goudy font-medium text-4xl leading-10 max-sm:text-2xl'>
                {adminData.awardTitle}
              </div>
              <div className='pb-10'>
                {adminData.awards.map((award: string, index: number) => {
                  return (
                    <div 
                      key={index}
                      className='text-white pt-10'
                    >
                      {award}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div className='bg-admin-color'>
          <div className='pt-5 text-center text-white font-goudy font-medium text-4xl leading-10 max-sm:text-2xl'>
            {adminData.administrationTitle}
          </div>
          <div className='grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4 px-10 py-10'>
            {adminData.administration.map((item: string, index: number) => {
              return (
                <div 
                  key={index} 
                  className='text-center text-core-color font-context font-normal text-base max-sm:text-xs leading-8 tracking-tighter'
                >
                  {item}
                </div>
              )
            })}
          </div>
        </div>
        <div className='pb-4'>
          <div className='py-5 text-gray-600 font-goudy font-medium text-4xl leading-10 max-sm:text-2xl'>
            {adminData.publicationTitle}
          </div>
          {adminData.publications.map((publication: string, index: number) => {
            return (
              <div 
                key={index}
                className='flex items-center pb-5'
              >
                <img
                  alt='PublicationIcon'
                  className='pr-4'
                  src={adminData.publicationIcon !== '' ? 
                    urlFor(adminData.publicationIcon).url() : 
                    ''
                  }
                />
                <div className='font-context font-normal text-base max-sm:text-xs leading-10 tracking-tighter'>
                  {publication}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Admin;