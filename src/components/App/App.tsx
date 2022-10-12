import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap, Expo } from 'gsap';

// imports of stylesheet and other assets
import './app.scss';
import cancel from '../../assets/svg/cancel2.svg'
import search from '../../assets/svg/zoom.svg'
import pencil from '../../assets/svg/pencil.svg'

// the class of all the balls that will be animated
const ballsArray = ['.ball1', '.ball2', '.ball3', '.ball4', '.ball5']

const App = () => {
    const tl = useRef<gsap.core.Timeline>({} as gsap.core.Timeline)
    const dTop = useRef<number[]>([]) // stores the top values for each of the balls, i.e by how many pixel to animate the top of each ball
    const lockAnimation = useRef<true|false>(false) // useFull for me to lock any disruption when an animation is going on
    const [showBalls, setShowBalls] = useState<boolean|null>(null) // if true {animate the balls into the scene} else {animates them out of the scene}

    // shows all the balls
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

    // hide all the balls
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

    // initialization! creates a new timeline, also collects the top.px of each balls
    useEffect(() => {
        // using javascript to collect the top.px of all of the balls
        const balls = document.querySelectorAll('.lgBalls') as NodeListOf<HTMLDivElement>
        balls.forEach((el: HTMLDivElement, index: number) => {
            const elTop = Number(el.getAttribute('data-top'))
            dTop.current.push(elTop + 10) // adding 10 because of extra animation in the showBallsFunc() and hideBallsFunc()
        })

        // creates a new gsap timeline
        tl.current = gsap.timeline({defaults:{duration: .5, ease: Expo.easeInOut }})
    }, [])

    // calls the function that will either show all balls or hide all balls
    useEffect(() => {
        if (lockAnimation.current) { return; }

        if (showBalls) {
            showBallsFunc()
        } else if (showBalls === false) {
            hideBallsFunc()
        }
    }, [showBalls, hideBallsFunc, showBallsFunc])

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

                {/* this svg element is used to define the filters that will be applied to the parent of the balls element, i.e .lgAdd_Ovr */}
                <svg>
                    <defs>
                        <filter id="blurMe">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur"/>
                            {/* the trick for this feColorMatrix is at the last value, once you begin to play with the 20 and -9, you'll understand how the animation works */}
                            <feColorMatrix
                                in="blur"
                                mode="matrix"
                                values="1 0 0 0 0     0 1 0 0 0     0 0 1 0 0    0 0 0 20 -9"
                                result="colorMatrix"
                            />
                            {/* the feComposite removes the blur effect from the image icon, i.e the element with class of .lgBtn */}
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