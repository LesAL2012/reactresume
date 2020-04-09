import React from 'react';
import { gdAgroBunner } from '../../redux/commonReducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import css from './AgroBunner.module.css';
import MWcss from './ModalWindow.module.css';
import { getAgroBunnerImg } from '../../redux/selector-agro';
import { Button, Modal } from 'react-bootstrap';
import touchAdnMove from '../../assets/img/icon_touch_and_move_32px.png';

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showText: {
                1: 'Summary corporation data. Google Charts with range-select and tables with filters.',
                2: 'Up to 6 tables in one query - 5 JOINs. COUNT, AVG, SUM, GROUP BY, ORDER BY.',
                3: 'Editing data in a browser - selecting or writing a comment in a cell; data is immediately stored on the server.',
                4: 'Media query: show / hide minor columns at low resolution.',
                5: 'Updating databases on the server - using the upload of csv files.',
                6: 'Create/Edit of a report template on the machinery and equipment of the corporation.',

                7: 'Curator data.',
                8: 'Mechanics data.',
                9: 'The color of the text in the report depends on the totals.',
            },

            displayModalWindow: 'none',
            indexImg: null,
            touchStartX: null,
            touchEndX: null,
        };

    }

    componentDidMount() {
        this.props.gdAgroBunner();
        document.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress = (event) => {
        if (event.key === 'Escape' && this.state.displayModalWindow === 'flex') {
            this.closeModalSlider();
        };
        if (event.key === 'ArrowRight' && this.state.displayModalWindow === 'flex') {
            this.sliderDown();
        };
        if (event.key === 'ArrowLeft' && this.state.displayModalWindow === 'flex') {           
            this.sliderUp();
        };        
    }

    showModalSlider = (index) => {
        this.setState({ displayModalWindow: 'flex' });
        this.setState({ indexImg: index + 1 });
    }

    closeModalSlider = () => {
        this.setState({ displayModalWindow: 'none' });
    }

    sliderUp = () => {
        if (this.state.indexImg === 9) {
            this.setState({ indexImg: 1 });
        } else {
            this.setState({ indexImg: this.state.indexImg + 1 });
        }
    }

    sliderDown = () => {
        if (this.state.indexImg === 1) {
            this.setState({ indexImg: 9 });
        } else {
            this.setState({ indexImg: this.state.indexImg - 1 });
        }
    }

    touchMoveStart = (TouchEvent) => {
        this.setState({ touchStartX: TouchEvent.changedTouches[0].screenX });
    }

    touchMoveEnd = (TouchEvent) => {
        this.setState({ touchEndX: TouchEvent.changedTouches[0].screenX });

        if (Math.abs(this.state.touchStartX - this.state.touchEndX) > 100) {
            if (this.state.touchStartX > this.state.touchEndX) {
                this.sliderUp();
            }
            else if (this.state.touchStartX < this.state.touchEndX) {
                this.sliderDown();
            }
        }
    }

    render() {
        //console.log(this.props.agroBunnerImg)        
        return <>


            <div className="row mt-5 px-3">
                <div className={"col-12 bg-primary " + css.mainBlock}>

                    <h4 className="text-center my-2 text-light">
                        Admin panel - login only with administrator rights
                    </h4>

                    <section className={css.slidershow}>
                        <div className={css.content}>
                            <div className={css.contentCarousel}>
                                {
                                    this.props.agroBunnerImg !== null
                                    &&
                                    this.props.agroBunnerImg.map((element, index) =>

                                        <figure key={element} className={css.shadow}>
                                            <img onClick={() => this.showModalSlider(index)}
                                                src={"https://react.ts.biz.ua/img/argoBunner/" + element} alt="img"
                                            />

                                            {
                                                Object.keys(this.state.showText).map(key =>
                                                    key === (index + 1).toString()
                                                    &&
                                                    <p key={key} className="text-center text-light">
                                                        {this.state.showText[key]}
                                                    </p>
                                                )
                                            }
                                        </figure>
                                    )
                                }
                            </div>
                        </div>
                    </section>
                </div>

            </div>


            <div onClick={this.closeModalSlider}
                className={MWcss.modalWrap}
                style={{ display: this.state.displayModalWindow }}
            >
                <div
                    onClick={(event) => { event.stopPropagation() }}
                    className={MWcss.modalWindow}
                >


                    <Modal.Header className={MWcss.modalWindowHeader}>
                        <Modal.Title style={{ fontSize: '16px' }}>
                            {this.state.showText[this.state.indexImg]}
                        </Modal.Title>
                        <Button className="ml-5" size="sm" variant="secondary" onClick={this.closeModalSlider}>
                            <i className="fas fa-times"></i>
                        </Button>
                    </Modal.Header>

                    <Modal.Body className="text-center" >
                        {
                            this.state.indexImg !== null
                            &&
                            <img
                                onTouchStart={(TouchEvent) => this.touchMoveStart(TouchEvent)}
                                onTouchEnd={(TouchEvent) => this.touchMoveEnd(TouchEvent)}
                                src={"https://react.ts.biz.ua/img/argoBunner/" + this.state.indexImg + ".png"} alt="img"
                            />
                        }
                    </Modal.Body>

                    <Modal.Footer>


                        {
                            (navigator.userAgent.match('iPhone') ||
                            navigator.userAgent.match('iPad') ||
                            navigator.userAgent.match('iPod') ||
                            navigator.userAgent.match('Android') ||
                            navigator.userAgent.match('RIM'))
                            &&
                            <img
                                className="mx-auto"
                                style={{ border: 'none', boxShadow: 'none' }}
                                src={touchAdnMove} alt='touch and move'
                            />

                        }


                        <Button
                            className="px-4 mx-2"
                            variant="primary" size="sm"
                            onClick={this.sliderUp}

                        >
                            <i className="fas fa-chevron-left"></i>
                        </Button>
                        <Button
                            className="px-4 mx-2"
                            variant="primary"
                            size="sm"

                            onClick={this.sliderDown}
                        >
                            <i className="fas fa-chevron-right"></i>
                        </Button>
                    </Modal.Footer>
                </div>
            </div>
        </>
    }

}


let mapStateToProps = (state) => {
    return {
        agroBunnerImg: getAgroBunnerImg(state),
    }
}

export default compose(
    connect(mapStateToProps, {
        gdAgroBunner,
    }),
)(LogIn);
