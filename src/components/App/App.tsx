// import { gsap } from 'gsap';

// imports of stylesheet and other assets
import './app.scss';
import cancel from '../../assets/svg/cancel2.svg'
import search from '../../assets/svg/zoom.svg'
import pencil from '../../assets/svg/pencil.svg'

const App = () => {

    return (
        <div className="AppMain">
            <div className="leftCvr">
                <div className="logoO">STANLEY</div>
                <div className="lgAdd_Ovr">
                    <div className=""><img src={cancel} alt="" /></div>
                    <div className="lgBalls"></div>
                    <div className="lgBalls ball2"></div>
                    <div className="lgBalls ball3"></div>
                    <div className="lgBalls ball4"></div>
                    <div className="lgBalls ball5"></div>
                </div>

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