import React from 'react'
import menuLinks from '../../menuOptions'
import { Link } from 'react-router-dom'
import { CaretRight } from '@phosphor-icons/react'

const Footer = () => {
    const footerLinks = menuLinks.filter(e => e != 'porsche models' && e != 'maserati models' )

    const scrollToTop = (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>

            <footer id='footer' className='grid py-10 bg-black capitalize text-base text-slate-300'>
                <div className='grid lg:grid-cols-2 text-center gap-10'>
                    <Link to="#" onClick={scrollToTop} className="transitional-all duration-300 hover:text-slate-500 hover:border-b-slate-500 flex py-2 border-slate-300 border-b-[.005rem] justify-between">
                        <div>back to top</div>
                        {/* <p>&rarr;</p> */}
                        <CaretRight />

                    </Link>
                    <Link to="/" className="transitional-all duration-300 hover:text-slate-500 hover:border-b-slate-500 flex py-2 border-slate-300 border-b-[.005rem] justify-between">
                        <div>Back to Home</div>
                        {/* <p>&rarr;</p> */}
                        <CaretRight />

                    </Link>
                    {
                        footerLinks.map((e, i) => {
                            return (
                                <Link key={i} to={`/${e.split(' ').pop()}`} className="transitional-all duration-300 hover:text-slate-500 border-b-slate-300 hover:border-b-slate-500 flex py-2 border-b-[.005rem] justify-between">
                                    <div className=''>{e}</div>
                                    {/* <p>&rarr;</p> */}
                                    <CaretRight />
                                </Link>
                            )
                        })
                    }
                </div>
                <div className='companies-logos pt-16 _510:pt-[7%] items-center flex-col gap-8 _510:gap-0 _510:flex-row flex justify-between pointer-events-none select-none'>
                    <div>
                        <img className='invert w-full max-w-[175px]' src="./assets/images/logos/porsche-logo.png" alt="porsche" />
                    </div>
                    <p className='text-[20px] font-mono'>X</p>
                    <div>
                        <img className='invert w-full max-w-[175px]' src="./assets/images/logos/maserati-logo.png" alt="maserati" />
                    </div>
                </div>
                <div className="credits mt-16 _510:mt-24 _510:flex-row border-t-[.005rem] border-t-slate-300 pt-10 flex text-base">
                    <p className='text-slate-300 text-center w-full transition-all duration-300 cursor-pointer _510:text-start hover:text-slate-500'>Designed & Developed by Dhruv</p>
                    <p className='text-slate-300 text-center w-full transition-all duration-300 cursor-pointer  _510:text-end hover:text-slate-500'>Assets mgt. and R & D by Prince</p>
                </div>
            </footer>

        </>
    )
}

export default Footer