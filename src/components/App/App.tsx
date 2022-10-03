// import { gsap } from 'gsap';

// imports of stylesheet and other assets
import './app.scss';
import cancel from '../../assets/svg/cancel2.svg'

const App = () => {

    return (
        <div className="AppMain">
            <div className="leftCvr">
                <div className="logoO">STANLEY</div>
                <div className="">
                    <div className="">
                        <img src={cancel} alt="" />
                    </div>
                </div>
            </div>
            <div className="rightCvr">
                <div className="">Search bar</div>
                <div className="">Notes</div>
                <div className="">
                    <div className="">blocks</div>
                </div>
            </div>
        </div>
    )
}
export default App;