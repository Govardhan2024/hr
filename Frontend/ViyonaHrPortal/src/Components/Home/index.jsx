import { FaArrowLeft } from "react-icons/fa";

import './index.css'
import PieChart from "../PieChart";
import SalaryBarGraph from "../SalaryBarGraph";
import TotalSalaryBarGraph from "../Wavebargraph";
import ToDoList from "../Todolist";


const Home = () => {
    return (
        <div className="main-home-page">
            <div className='dashborad-text'>
                <div className="flex-dashboard-text">
                    <FaArrowLeft width={12} height={14} color="#3408A4" />
                    <h1 className="main-home-head"> Dashboard</h1>
                </div>
                <div>
                    <p><span className="viyona-text">VIYONA</span> <span className="viyona-span">/ Dashboard</span></p>

                </div>
            </div>
            <div className="home-main-stats-cards">
                <div className="first-stats-card">

                    <div className="inneer-main-card">
                        <div className="inner-card">
                            <img className="inner-image" src="../../../public/images/innerIcon.svg" />
                        </div>
                        <div>
                            <h1 className="innertext">New Employee</h1>
                            <p className="innercount">22</p>
                        </div>
                    </div>
                    <div className="inneer-main-card">
                        <div className="inner-card">
                            <img className="inner-image" src="../../../public/images/innerIcon2.svg" />
                        </div>
                        <div>
                            <h1 className="innertext">Total Employee</h1>
                            <p className="innercount">425</p>
                        </div>
                    </div>
                    <div className="inneer-main-card">
                        <div className="inner-card">
                            <img className="inner-image" src="../../../public/images/innerIcon3.svg" />
                        </div>
                        <div>
                            <h1 className="innertext">Total Salary</h1>
                            <p className="innercount">₹2.8M</p>
                        </div>
                    </div>
                    <div className="inneer-main-card">
                        <div className="inner-card">
                            <img className="inner-image" src="../../../public/images/innerIcon3.svg" />
                        </div>
                        <div>
                            <h1 className="innertext">Avg. Salary</h1>
                            <p className="innercount">₹1,250</p>
                        </div>
                    </div>
                </div>
                <div className="first-stats-card">
                    <div>
                        <h1 className="main-head">Income Analysis</h1>
                        <p className="secondcard-para">8% High then last month</p>
                    </div>
                    <div className="piechart">
                        <PieChart/>
                    </div>
                    <div className="bottom-text">
                        <div>
                            <h1 className="botom-head">Design</h1>
                            <p className="last-para">84.60%</p>
                        </div>
                        <div>
                            <h1 className="botom-head">Dev</h1>
                            <p className="last-para">15.40%</p>
                        </div>
                        <div>
                            <h1 className="botom-head">SRO</h1>
                            <p className="last-para">5.10%</p>
                        </div>
                    </div>
                </div>

                <div className="year-stats-card">
                    <div className="salary-head-mani">
                        <div className="year-head">
                            <h1 className="year-head-text">Salary Statistics</h1>
                        </div>
                        <div className="small-cards">
                            <button className="salary-innertopcards">
                                <h1 className="wHead">W</h1>
                            </button>
                            <button className="salary-innertopcards">
                                <h1 className="wHead">M</h1>
                            </button>
                            <button className="salary-innertopcards2">
                                <h1 className="wHead3">Y</h1>
                            </button>

                        </div>
                       
                    </div>
                    <div>
                            <SalaryBarGraph/>
                        </div>
                </div>
            </div>
            <div className="home-main-stats-cards">
                <div className="slary-stats-card">
                    <div className="salary-head-mani">
                        <div className="year-head">
                            <h1 className="year-head-text">Total Salary by Unit</h1>
                        </div>
                       
                        <div className="small-cards">
                            <button className="salary-innertopcards">
                                <h1 className="wHead">W</h1>
                            </button>
                            <button className="salary-innertopcards">
                                <h1 className="wHead">M</h1>
                            </button>
                            <button className="salary-innertopcards2">
                                <h1 className="wHead3">Y</h1>
                            </button>
                        
                        </div>
                        
                    </div>
                    <div>
                            <TotalSalaryBarGraph/>
                        </div>
                </div>
                <div className="todo-stats-card">
                    <h1 className="todotext">ToDo List   </h1>
                    <div>
                        <ToDoList/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home