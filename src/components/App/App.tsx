import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap, Expo, Bounce } from 'gsap';

// imports of stylesheet and other assets
import './app.scss';
import cancel from '../../assets/svg/cancel2.svg'
import search from '../../assets/svg/zoom.svg'
import pencil from '../../assets/svg/pencil.svg'

const App = () => {
    const tl = useRef<gsap.core.Timeline>({} as gsap.core.Timeline)
    const dTop = useRef<number[]>([])
    const lockAnimation = useRef<true|false>(false)
    const ballsArray = ['.ball1', '.ball2', '.ball3', '.ball4', '.ball5']
    const [showBalls, setShowBalls] = useState<boolean|null>(null)


    useEffect(() => {
        const balls = document.querySelectorAll('.lgBalls') as NodeListOf<HTMLDivElement>
        balls.forEach((el: HTMLDivElement, index: number) => {
            const elTop = Number(el.getAttribute('data-top'))
            dTop.current.push(elTop + 10)
        })

        tl.current = gsap.timeline({defaults:{duration: .5, ease: Expo.easeInOut }})
    }, [])

    useEffect(() => {
        if (lockAnimation.current) { return; }

        if (showBalls) {
            showBallsFunc()
        } else if (showBalls === false) {
            hideBallsFunc()
        }
    }, [showBalls])

    const showBallsFunc = useCallback(() => {
        if (lockAnimation.current) { return; }
        lockAnimation.current = true

        gsap.to('.lgBtn', {rotate:675, scale:.7, duration: .6,  transformOrigin: 'center'})
        gsap.to('.lgBtn', {scale:1, duration: .5, delay:.3})

        tl.current.to(ballsArray, {top: `${dTop.current[0]}px` })
            .to(ballsArray.slice(0), {top: `${dTop.current[0] - 10}px`, duration:1, ease: "back.out(4)" })

            .to(ballsArray.slice(1), {top: `${dTop.current[1]}px`, delay:-.5})
            .to(ballsArray.slice(1), {top: `${dTop.current[1] - 10}px`, duration:1, ease: "back.out(4)" })

            .to(ballsArray.slice(2), {top: `${dTop.current[2]}px`, delay:-.5})
            .to(ballsArray.slice(2), {top: `${dTop.current[2] - 10}px`, duration:1, ease: "back.out(4)" })

            .to(ballsArray.slice(3), {top: `${dTop.current[3]}px`, delay:-.5})
            .to(ballsArray.slice(3), {top: `${dTop.current[3] - 10}px`, duration:1, ease: "back.out(4)" })

            .to(ballsArray.slice(4), {top: `${dTop.current[4]}px`, delay:-.5})
            .to(ballsArray.slice(4), {top: `${dTop.current[4] - 10}px`, duration:1, ease: "back.out(4)", onComplete: () => { lockAnimation.current = false; } })
    }, [])

    const hideBallsFunc = useCallback(() => {
        if (lockAnimation.current) {  return; }
        lockAnimation.current = true

        gsap.to('.lgBtn', {rotate:-3600, duration: 3, onComplete:() => {
            gsap.set('.lgBtn', {rotate:0})
        }})

        tl.current
            .to(ballsArray.slice(4), {ease:Expo.easeOut, top: `${dTop.current[3] - 10}px` })
            .to(ballsArray.slice(3), {ease:Expo.easeOut, top: `${dTop.current[2] - 10}px`})
            .to(ballsArray.slice(2), {ease:Expo.easeOut, top: `${dTop.current[1] - 10}px`})
            .to(ballsArray.slice(1), {ease:Expo.easeOut, top: `${dTop.current[0] - 10}px`})
            .to(ballsArray, {duration:.2, ease:Expo.easeOut, top: `-15px`, onComplete: () => { lockAnimation.current = false; } })
    }, [])

    return (
        <div className="AppMain">
            <div className="leftCvr">
                <div className="logoO">STANLEY</div>
                <div className="lgAdd_Ovr">
                    <div className="lgBtn" onClick={() => {
                        if (!lockAnimation.current) setShowBalls(!showBalls)
                    }}>
                        <img src={cancel} alt="" />
                    </div>
                    <div className="lgBalls ball1" data-top={60}></div>
                    <div className="lgBalls ball2" data-top={123}></div>
                    <div className="lgBalls ball3" data-top={186}></div>
                    <div className="lgBalls ball4" data-top={249}></div>
                    <div className="lgBalls ball5" data-top={312}></div>
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