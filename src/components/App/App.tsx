import { useEffect, useRef } from 'react';
import { gsap, Expo, Bounce } from 'gsap';

// imports of stylesheet and other assets
import './app.scss';
import cancel from '../../assets/svg/cancel2.svg'
import search from '../../assets/svg/zoom.svg'
import pencil from '../../assets/svg/pencil.svg'

const App = () => {
    const tl = useRef<gsap.core.Timeline>()
    const dTop = useRef<number[]>([])
    const ballsArray = ['.ball1', '.ball2', '.ball3', '.ball4', '.ball5']


    useEffect(() => {

        const balls = document.querySelectorAll('.lgBalls') as NodeListOf<HTMLDivElement>
        balls.forEach((el: HTMLDivElement, index: number) => {
            const elTop = el.offsetTop
            dTop.current.push(elTop)
        })

        gsap.set('.lgBalls', {position: 'absolute', left: '42.25%', top: '-12px', visibility: 'visible'});

        tl.current = gsap.timeline({defaults:{duration: 1, ease: Expo.easeInOut }})
        tl.current.to(ballsArray, {top: `${dTop.current[0]}px` })
            .to(ballsArray.slice(0), {top: `${dTop.current[0] - 10}px`, ease: Bounce.easeOut })

            .to(ballsArray.slice(1), {top: `${dTop.current[1]}px`, delay:-1})
            .to(ballsArray.slice(1), {top: `${dTop.current[1] - 10}px`, ease: Bounce.easeOut })

            .to(ballsArray.slice(2), {top: `${dTop.current[2]}px`, delay:-1})
            .to(ballsArray.slice(2), {top: `${dTop.current[2] - 10}px`, ease: Bounce.easeOut })

            .to(ballsArray.slice(3), {top: `${dTop.current[3]}px`, delay:-1})
            .to(ballsArray.slice(3), {top: `${dTop.current[3] - 10}px`, ease: Bounce.easeOut })

            .to(ballsArray.slice(4), {top: `${dTop.current[4]}px`, delay:-1 })
            .to(ballsArray.slice(4), {top: `${dTop.current[4] - 10}px`, ease: Bounce.easeOut })

    }, [])

    return (
        <div className="AppMain">
            <div className="leftCvr">
                <div className="logoO">STANLEY</div>
                <div className="lgAdd_Ovr">
                    <div className=""><img src={cancel} alt="" /></div>
                    <div className="lgBalls ball1"></div>
                    <div className="lgBalls ball2"></div>
                    <div className="lgBalls ball3"></div>
                    <div className="lgBalls ball4"></div>
                    <div className="lgBalls ball5"></div>
                </div>

                <svg>
                    <defs>
                        <filter id="blurMe">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur"/>
                            <feColorMatrix
                                in="blur"
                                mode="matrix"
                                values="1 0 0 0 0     0 1 0 0 0     0 0 1 0 0    0 0 0 20 -9"
                                result="colorMatrix"
                            />
                            <feComposite
                                in="SourceGraphic"
                                in2="colorMatrix"
                                mode="matrix"
                                operator="atop"
                            />
                        </filter>
                    </defs>
                </svg>
            </div>
            <div className="rightCvr">
                <div className="search_cvr">
                    <div className=""><img src={search} alt="" /></div>
                    <div className="">Search</div>
                </div>
                <div className="titleO">Notes</div>
                <div className="">
                    <div className="eNotes">
                        <div className="eNotes__top">
                            Magna excepteur deserunt est velit est eu exercitation do tempor. Ipsum laboris deserunt magna voluptate adipisicing ipsum. Exercitation elit nostrud do ex ipsum mollit est. Reprehenderit est eiusmod non quis qui do amet ex irure.
                        </div>
                        <div className="eNotes__bottom">
                            <div className="date">May 22, 2022</div>
                            <div className="pencil">
                                <div className=""><img src={pencil} alt="" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default App;