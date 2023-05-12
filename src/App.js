import './App.css';
import React, {useEffect} from "react";
import {RenderAfterNavermapsLoaded, NaverMap, Marker} from 'react-naver-maps';
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import KakaoShareButton from "./kakao/share";
import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css';
import Snowfall from 'react-snowfall';

function App() {
    let selectedImg = 1;
    const totalImg = 10;
    const groomAccountNum = "신한 111-111-111111";
    const groomDadAccountNum = "농협 111-11-111111";
    const brideAccountNum = "하나 111-111111-11111";
    const brideDadAccountNum = "하나 111-111111-11111";
    const brideMomAccountNum = "국민 111-11-1111-111";

    const [touchStartX, setTouchStartX] = React.useState(0);
    const [touchStartY, setTouchStartY] = React.useState(0);
    const [touchEndX, setTouchEndX] = React.useState(0);
    const [touchEndY, setTouchEndY] = React.useState(0);

    const handleClickScrollGallery = () => {
        const element = document.getElementById('gallery');
        if (element) {
            element.scrollIntoView();
        }
    };
    const handleClickScrollSongdo = () => {
        const element = document.getElementById('publicBus');
        if (element) {
            element.scrollIntoView();
        }
    };

    function handleTouchStart(e) {
        setTouchStartX(e.targetTouches[0].clientX);
        setTouchStartY(e.targetTouches[0].clientY);
        e.preventDefault();
    }

    function handleTouchMove(e) {
        setTouchEndX(e.targetTouches[0].clientX);
        setTouchEndY(e.targetTouches[0].clientY);
    }

    function handleTouchEnd(index) {
        const distanceX = Math.abs(touchStartX - touchEndX);
        const distanceY = Math.abs(touchStartY - touchEndY);

        if (distanceX > 90 && distanceY < 90) {
            if (touchStartX - touchEndX > 0) {
                openImage(index+1, index);
            } else {
                openImage(index-1, index);
            }
        }
        setTouchStartX(() => 0);
        setTouchStartY(() => 0);
        setTouchEndX(() => 0);
        setTouchEndY(() => 0);
    }

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://developers.kakao.com/sdk/js/kakao.js'
        script.async = true

        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    function disableScroll() {
        document.body.style.overflow = 'hidden';
    }

    function enableScroll() {
        document.body.style.overflow = 'unset';
    }

    function textCopyAlert(text) {
        var copyText = "";
        if (text['brideAccountNum']) {
            copyText = JSON.stringify(text['brideAccountNum']);
        } else if (text['brideDadAccountNum']) {
            copyText = JSON.stringify(text['brideDadAccountNum']);
        } else if (text['brideMomAccountNum']) {
            copyText = JSON.stringify(text['brideMomAccountNum']);
        } else if (text['groomAccountNum']) {
            copyText = JSON.stringify(text['groomAccountNum']);
        } else if (text['groomDadAccountNum']) {
            copyText = JSON.stringify(text['groomDadAccountNum']);
        }
        alert(copyText + ' 클립보드에 복사되었습니다 :)');
    }

    function openImage(imageId, prevId=null) {
        selectedImg = imageId;
        if (imageId < 1) {
            selectedImg = totalImg;
        } else if (imageId > totalImg) {
            selectedImg = 1;
        }

        if (document.getElementById("ImageViewWindow").style.display !== "block") {
            document.getElementById("ImageViewWindow").style.display = "block";
        }

        for (let i = 1; i < totalImg+1; i++) {
            if (i === selectedImg) {
                document.getElementById("i"+selectedImg).style.display = "inline-block";
            } else {
                document.getElementById("i"+i).style.display = "none";
            }
        }
        disableScroll();
    }

    function closeImage() {
        document.getElementById("ImageViewWindow").style.display = "none";
        for (let i = 1; i < totalImg+1; i++) {
            document.getElementById("i"+i).style.display = "none";
        }
        enableScroll();
    }

    function showMorePhotos() {
        if (document.getElementById("p10").style.display !== "inline") {
            document.getElementById("smb").textContent = "닫기";
            for (let i = 10; i < totalImg+1; i++) {
                document.getElementById("p"+i).style.display = "inline";
            }
            return
        } else {
            document.getElementById("smb").textContent = "더보기";
            for (let i = 10; i < totalImg+1; i++) {
                document.getElementById("p"+i).style.display = "none";
            }
            handleClickScrollGallery();
            return
        }
    }

    function openThanksGroom() {
        if (document.getElementById("GroomAccount").style.display !== "inline-block") {
            document.getElementById("GroomAccount").style.display = "inline-block";
            return
        } else {
            document.getElementById("GroomAccount").style.display = "none";
            return
        }
    }

    function openThanksBride() {
        if (document.getElementById("BrideAccount").style.display !== "inline-block") {
            document.getElementById("BrideAccount").style.display = "inline-block";
            return
        } else {
            document.getElementById("BrideAccount").style.display = "none";
            return
        }
    }

    function ShowTransportationSongdo() {
        if (document.getElementById("TransportationDescSongdo").style.display !== "inline") {
            document.getElementById("TransportationSongdo").textContent = "송도에서 오실 경우 ▲";
            document.getElementById("TransportationDescSongdo").style.display = "inline";
            return
        } else {
            document.getElementById("TransportationSongdo").textContent = "송도에서 오실 경우 ▼";
            document.getElementById("TransportationDescSongdo").style.display = "none";
            handleClickScrollSongdo();
            return
        }
    }


    return (
        <RenderAfterNavermapsLoaded
            ncpClientId={"abcdefg123"}
            error={<p>Maps Load Error</p>}
            loading={<p>Maps Loading...</p>}
        >
        <div>
            <div className="GreetingImage">
                <div className="animate__animated animate__fadeIn" style={{animationDuration: "4s"}}>
                    <Snowfall snowflakeCount={100} speed={[0.5, 1.5]} wind={[-0.5, 0.5]} radius={[0.5, 1.0]}/>
                <img className="GreetingSnap" src="/img/gate.jpg"/>
                </div>
            </div>
            <div className="animate__animated animate__fadeIn" style={{animationDuration: "4s"}}>
                <p style={{color: "#5B5454", fontSize: "19px", lineHeight: 1.6}}>
                    <br/>
                    2023년 2월 4일 토요일 오전 11:30<br/>
                    아모리스 역삼<br/><br/>
                </p>
            </div>
            <div className="GreetingMessage">
                <ScrollAnimation animateIn="fadeIn">
                    <img className="FlowerIcon" src="/img/icon_flower.png"/>
                    <p style={{color: "#FAFAF9", fontSize: "25px"}}>성래 & 지수 결혼합니다</p><br/>
                </ScrollAnimation>
                <text className="TextArea">
                    <ScrollAnimation animateIn="fadeIn">
                        10년이라는 긴 시간을 건너<br/>
                        서로의 마음이 닿게 되었습니다.<br/><br/>
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="fadeIn">
                        봄이 시작되는 날,<br/>
                        둘이서 함께하는 첫 걸음을 내딛으려 합니다.<br/>
                        귀한 발걸음 내어 축복해주신다면<br/>
                        더 없는 기쁨으로 간직하겠습니다.<br/>
                    </ScrollAnimation>
                    <br/><br/>
                    <ScrollAnimation animateIn="fadeIn">
                        아버님. 어머님 <text className="SonDaughter">의&nbsp;&nbsp;아들</text>&nbsp;성래<br/>
                        아부지. 어무니 <text className="SonDaughter">의&nbsp;&nbsp;<text className="Daughter">딸</text></text>&nbsp;지수
                    </ScrollAnimation>
                </text>
            </div>

            <div className="Contacts">
                <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                <div className="ContactTable">
                    <text className="TextArea">
                    <div className="GroomTable">
                        <div className="GroomContact">
                            정 성 래<br/>
                            <a href="tel:01000000000"><img className="CallIcon" src="/img/call_button.png"/></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <a href="sms:01000000000"><img className="SmsIcon" src="/img/sms_button.png"/></a><br/>
                            <br/><br/>
                        </div>
                        <div className="GroomDadContact">
                            <text className="ContactParentsText">
                            신랑 아버지&nbsp;&nbsp;아 버 님<br/>
                                <a href="tel:01000000000">
                                    <img className="CallIcon" src="/img/call_button_icon.png" style={{verticalAlign: "top", height: "30px"}}/>
                                </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <a href="sms:01000000000">
                                    <img className="SmsIcon" src="/img/sms_button_icon.png" style={{verticalAlign: "top", height: "30px"}}/>
                                </a>
                                <br/><br/></text>
                        </div>
                        <div className="GroomMomContact">
                            <text className="ContactParentsText">
                            신랑 어머니&nbsp;&nbsp;어 머 님<br/>
                                <a href="tel:01000000000">
                                    <img className="CallIcon" src="/img/call_button_icon.png" style={{verticalAlign: "top", height: "30px"}}/>
                                </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <a href="sms:01000000000">
                                    <img className="SmsIcon" src="/img/sms_button_icon.png" style={{verticalAlign: "top", height: "30px"}}/>
                                </a><br/>
                                <br/></text>
                        </div>
                    </div>
                    <div className="BrideTable">
                        <div className="BrideContact">
                            이 지 수<br/>
                            <a href="tel:01000000000"><img className="CallIcon" src="/img/call_button.png"/></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <a href="sms:01000000000"><img className="SmsIcon" src="/img/sms_button.png"/></a><br/>
                            <br/><br/>
                        </div>
                        <div className="BrideDadContact">
                            <text className="ContactParentsText">
                                신부 아버지&nbsp;&nbsp;아 부 지<br/>
                                <a href="tel:01000000000">
                                    <img className="CallIcon" src="/img/call_button_icon.png" style={{verticalAlign: "top", height: "30px"}}/>
                                </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <a href="sms:01000000000">
                                    <img className="SmsIcon" src="/img/sms_button_icon.png" style={{verticalAlign: "top", height: "30px"}}/>
                                </a>
                                <br/><br/></text>
                        </div>
                        <div className="BrideMomContact">
                            <text className="ContactParentsText">
                                신부 어머니&nbsp;&nbsp;어 무 니<br/>
                                <a href="tel:01000000000">
                                    <img className="CallIcon" src="/img/call_button_icon.png" style={{verticalAlign: "top", height: "30px"}}/>
                                </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <a href="sms:01000000000">
                                    <img className="SmsIcon" src="/img/sms_button_icon.png" style={{verticalAlign: "top", height: "30px"}}/>
                                </a><br/>
                                <br/></text>
                        </div>
                    </div>
                    </text>
                </div>
                </ScrollAnimation>
            </div>

            <div className="Splitter"></div>

            <div className="Gallery" id="gallery">
                <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                    <p className="TitleEng">Gallery</p>
                    <hr className="TitleUnderline" />
                    <p className="TitleKor">포 토 갤 러 리</p><br/><br/>
                </ScrollAnimation>

                <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                <div className="ThumbnailTable">
                    <div id="p1" className="ThumbnailItem">
                        <div className="ThumbnailWrapper">
                            <img className="Thumbnail" src={"/img/thumbnail1.png"} onClick={() => openImage(1)}/>
                        </div>
                    </div>
                    <div id="p2" className="ThumbnailItem">
                        <div className="ThumbnailWrapper">
                            <img className="Thumbnail" src="/img/thumbnail2.png" onClick={() => openImage(2)}/>
                        </div>
                    </div>
                    <div id="p3" className="ThumbnailItem">
                        <div className="ThumbnailWrapper">
                            <img className="Thumbnail" src="/img/thumbnail3.png" onClick={() => openImage(3)}/>
                        </div>
                    </div>
                    <div id="p4" className="ThumbnailItem">
                        <div className="ThumbnailWrapper">
                            <img className="Thumbnail" src="/img/thumbnail4.png" onClick={() => openImage(4)}/>
                        </div>
                    </div>
                    <div id="p5" className="ThumbnailItem">
                        <div className="ThumbnailWrapper">
                            <img className="Thumbnail" src="/img/thumbnail5.png" onClick={() => openImage(5)}/>
                        </div>
                    </div>
                    <div id="p6" className="ThumbnailItem">
                        <div className="ThumbnailWrapper">
                            <img className="Thumbnail" src="/img/thumbnail6.png" onClick={() => openImage(6)}/>
                        </div>
                    </div>
                    <div id="p7" className="ThumbnailItem">
                        <div className="ThumbnailWrapper">
                            <img className="Thumbnail" src="/img/thumbnail7.png" onClick={() => openImage(7)}/>
                        </div>
                    </div>
                    <div id="p8" className="ThumbnailItem">
                        <div className="ThumbnailWrapper">
                            <img className="Thumbnail" src="/img/thumbnail8.png" onClick={() => openImage(8)}/>
                        </div>
                    </div>
                    <div id="p9" className="ThumbnailItem">
                        <div className="ThumbnailWrapper">
                            <img className="Thumbnail" src="/img/thumbnail9.png" onClick={() => openImage(9)}/>
                        </div>
                    </div>
                    <div id="p10" className="ThumbnailItem" style={{display: "none"}}>
                        <div className="ThumbnailWrapper">
                            <img className="Thumbnail" src="/img/thumbnail10.png" onClick={() => openImage(10)}/>
                        </div>
                    </div>
                </div>
                </ScrollAnimation>

                <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                    <button id="smb" className="ShowMoreButton" onClick={showMorePhotos}>
                        더보기
                    </button>
                </ScrollAnimation>

            </div>

            <div className="Splitter"></div>

            <br/><br/><br/>
            <div className="Calendar">
                <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                    <img className="CalendarPic" src="/img/calendar.png"/>
                </ScrollAnimation>
            </div>

            <div className="Location">
                <div className="LocationDetails">
                    <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                        <p className="TitleEng">Location</p>
                        <hr className="TitleUnderline" />
                        <p className="TitleKor">오 시 는 길</p>
                    </ScrollAnimation>

                    <text className="TextArea"><br/>
                        <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
                            <b>아모리스 역삼</b><br/>
                            서울 강남구 논현로 508 GS타워 1층 (단독홀)<br/>
                            <text className="ContentsDescTextArea">(tel) 02-2005-1010</text><br/>
                        </ScrollAnimation>
                    </text>
                </div>
                <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                    <div className="LocationMap">
                        <NaverMap
                            mapDivId={"map"}
                            style={{ width: '100%', height: '35vh'}}
                            defaultCenter={{ lat: 37.501859, lng: 127.037276 }}
                            defaultZoom={15}>
                            <Marker
                                key={1}
                                position={{ lat: 37.501859, lng: 127.037276 }}
                                infoWindow={{content: "아모리스"}}
                                animation={2} />
                        </NaverMap>
                    </div>
                </ScrollAnimation>
                <div className="Transportation">
                    <text className="TextArea">
                        <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
                        <text className="TransportationType">지 하 철</text><br/>
                            <text className="ContentsTextArea">2호선 <u>역삼역 지하 연결</u><br/>
                                <text className="ContentsDescTextArea">(<u>7번 출구 방향</u>에 GS타워 지하1층과 연결되어 있습니다.<br/>
                                    GS타워 내에서 에스컬레이터로 올라오시면 됩니다.)<br/>
                                </text>
                            </text>
                            <img className="YeokSamStn" src="/img/yeoksam.jpg"/>
                        <br/><br/>
                        </ScrollAnimation>
                        <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
                        <text className="TransportationType" id="publicBus">버 스</text><br/>
                            <text className="ContentsTextArea">147, 463, 3412, 4211, 9600 <text className="ContentsDescTextArea">(역삼역.GS타워)</text><br/>
                                146, 242, 341, 360, 740 <br/>
                            </text>
                            <text className="ContentsDescTextArea">(아가방빌딩.하나은행 or 한서병원)</text><br/><br/>
                        </ScrollAnimation>
                        <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
                        <text className="TransportationType">자 가 용 (주 차)</text><br/>
                            <text className="ContentsTextArea">건물 내 지하 주차장 <u>4시간 무료</u></text><br/>
                            <text className="ContentsDescTextArea">(규모 약 <u>1,000대</u>)</text>
                        <br/><br/><br/>
                        </ScrollAnimation>
                        <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
                        <button id="TransportationSongdo" className="TransportationSongdo" onClick={ShowTransportationSongdo}>
                            송도에서 오실 경우 ▼
                        </button>
                        </ScrollAnimation>
                        <text id="TransportationDescSongdo" className="ContentsTextArea" style={{display: "none"}}>
                            <div className="animate__animated animate__fadeIn" style={{lineHeight: "1.6"}}>
                                <br/>M6405, 9201 버스 탑승
                                <br/>→ 서초역 지하철 2호선 환승
                                <br/>→ 역삼역 하차<br/><br/>
                                <text className="AccountTitle">★ 셔틀버스 안내 ★</text><br/>
                                *탑승 당일 사원증 지참해주세요<br/>
                                *신부 하객 중 탑승 원하는 분은<br/>
                                 신부에게 말씀해주세요


                            </div>
                        </text>
                    </text>

                </div>
            </div>

            <div className="Splitter"></div>

            <div className="Thanks">
                <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                    <p className="TitleEng">Thanks</p>
                    <hr className="TitleUnderline" />
                    <p className="TitleKor">마 음 전 하 실 곳</p><br/><br/>
                </ScrollAnimation>

                <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                <button className="ShowGiftButton" onClick={openThanksGroom}>
                    신랑측 마음 전하실 곳
                </button>
                <div className="AccountInfo" id="GroomAccount">
                    <text className="AccountTextArea">
                        <div className="animate__animated animate__fadeIn">
                            <text className="AccountTitle">신랑 아버지 계좌번호</text><br/>
                            <text className="AccountInfoText">
                                <CopyToClipboard className="CopyText" text={groomDadAccountNum} onCopy={() => textCopyAlert({groomDadAccountNum})}>
                                    <text>{groomDadAccountNum}</text></CopyToClipboard>&nbsp;&nbsp;&nbsp;(아버님)
                            </text>
                            <div className="AccountInfoBtn">
                                <CopyToClipboard text={groomDadAccountNum} onCopy={() => textCopyAlert({groomDadAccountNum})}>
                                    <img className="AccountCopyIcon" src="/img/acc_copy_button.png"/></CopyToClipboard>
                            </div>
                        <br/>
                        <text className="AccountTitle">신랑 계좌번호</text><br/>
                        <text className="AccountInfoText">
                            <CopyToClipboard className="CopyText" text={groomAccountNum} onCopy={() => textCopyAlert({groomAccountNum})}>
                                <text>{groomAccountNum}</text></CopyToClipboard>&nbsp;&nbsp;&nbsp;(정성래)
                        </text>
                            <div className="AccountInfoBtn">
                                <CopyToClipboard text={groomAccountNum} onCopy={() => textCopyAlert({groomAccountNum})}>
                                    <img className="AccountCopyIcon" src="/img/acc_copy_button.png"/></CopyToClipboard>&nbsp;&nbsp;
                                <a href="https://pay-home.kakao.com/talk/scheme/money/to/qr?qr_code= &chan= &is_intermediary=false">
                                    <img className="KakaoPayIcon" src="/img/kakaopay_button.png"/>
                                </a>
                            </div>
                        </div>
                            <br/>
                    </text>
                </div>


                <br/>
                <button className="ShowGiftButton" onClick={openThanksBride}>
                    신부측 마음 전하실 곳
                </button>
                <div className="AccountInfo" id="BrideAccount">
                    <text className="AccountTextArea">
                        <div className="animate__animated animate__fadeIn">
                            <text className="AccountTitle">신부 아버지 계좌번호</text><br/>
                        <text className="AccountInfoText">
                            <CopyToClipboard className="CopyText" text={brideDadAccountNum} onCopy={() => textCopyAlert({brideDadAccountNum})}>
                                <text>{brideDadAccountNum}</text></CopyToClipboard>&nbsp;&nbsp;&nbsp;(아부지)
                        </text>
                            <div className="AccountInfoBtn">
                                <CopyToClipboard text={brideDadAccountNum} onCopy={() => textCopyAlert({brideDadAccountNum})}>
                                    <img className="AccountCopyIcon" src="/img/acc_copy_button.png"/></CopyToClipboard>
                            </div>
                            <br/>
                        <text className="AccountTitle">신부 어머니 계좌번호</text><br/>
                        <text className="AccountInfoText">
                            <CopyToClipboard className="CopyText" text={brideMomAccountNum} onCopy={() => textCopyAlert({brideMomAccountNum})}>
                                <text>{brideMomAccountNum}</text></CopyToClipboard>&nbsp;&nbsp;&nbsp;(어무니)&nbsp;&nbsp;
                        </text>
                            <div className="AccountInfoBtn">
                                <CopyToClipboard text={brideMomAccountNum} onCopy={() => textCopyAlert({brideMomAccountNum})}>
                                    <img className="AccountCopyIcon" src="/img/acc_copy_button.png"/></CopyToClipboard>
                            </div>
                        <br/>
                        <text className="AccountTitle">신부 계좌번호</text><br/>
                        <text className="AccountInfoText">
                            <CopyToClipboard className="CopyText" text={brideAccountNum} onCopy={() => textCopyAlert({brideAccountNum})}>
                                <text>{brideAccountNum}</text></CopyToClipboard>&nbsp;&nbsp;&nbsp;(이지수)&nbsp;&nbsp;
                        </text>
                            <div className="AccountInfoBtn">
                                <CopyToClipboard text={brideAccountNum} onCopy={() => textCopyAlert({brideAccountNum})}>
                                    <img className="AccountCopyIcon" src="/img/acc_copy_button.png"/></CopyToClipboard>&nbsp;&nbsp;
                                <a href="https://pay-home.kakao.com/talk/scheme/money/to/qr?qr_code= &chan= &is_intermediary=false">
                                    <img className="KakaoPayIcon" src="/img/kakaopay_button.png"/>
                                </a>
                            </div>
                        </div>
                        <br/>
                    </text>
                </div>
                </ScrollAnimation>

                <br/><br/>
            </div>

            <div className="Splitter"></div>

            <div className="QnA">
                <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                    <p className="TitleEng">FAQ</p>
                    <hr className="TitleUnderline" />
                    <p className="TitleKor">자 주 묻 는 질 문</p><br/>
                </ScrollAnimation>

                <text className="TextArea">
                    <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
                    <text className="TransportationType">Q. 신혼여행은 어디로 가나요?</text><br/>
                    <text className="ContentsTextArea">A. 몰디브로 갑니다! (달러야 진정해..)</text>
                    </ScrollAnimation>
                    <br/>
                    <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
                        <text className="TransportationType">Q. 꽃이 예쁘다던데..</text><br/>
                        <text className="ContentsTextArea">A. 식이 끝나고 테이블 꽃을 가져가실 수 있습니다!<br/>
                        직원의 안내에 따라 꽃 포장해서 가져가세용~</text>
                    </ScrollAnimation>
                    <br/>
                    <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
                        <text className="TransportationType">Q. 밥이 맛있다던데..</text><br/>
                        <text className="ContentsTextArea">A. 식사는 한식 코스로 제공됩니다!</text>
                    </ScrollAnimation>
                </text>

                <br/><br/><br/>
            </div>

            <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
                <div className="Share">
                    <KakaoShareButton />
                </div>
            </ScrollAnimation>
            <br/><br/><br/>

            <div className="Footer">
                <p>Designed & Developed by Jisoo</p>
            </div>

            <div id="ImageViewWindow" className="ImageViewWindow">
                <div className="CloseButtonPanel">
                    <img className="CloseButton" src="/img/close_button.png" onClick={closeImage}/>
                </div>
                <div className="ImageSlide">
                    <div className="ImageSlideItem">
                        <img id="i1" className="Image" src="/img/img1.jpg"
                             onTouchStart={(event) => handleTouchStart(event)}
                             onTouchMove={(event) => handleTouchMove(event)}
                             onTouchEnd={() => handleTouchEnd(1)}/>
                        <img id="i2" className="Image" src="/img/img2.jpg"
                             onTouchStart={(event) => handleTouchStart(event)}
                             onTouchMove={(event) => handleTouchMove(event)}
                             onTouchEnd={() => handleTouchEnd(2)}/>
                        <img id="i3" className="Image" src="/img/img3.jpg"
                             onTouchStart={(event) => handleTouchStart(event)}
                             onTouchMove={(event) => handleTouchMove(event)}
                             onTouchEnd={() => handleTouchEnd(3)}/>
                        <img id="i4" className="Image" src="/img/img4.jpg"
                             onTouchStart={(event) => handleTouchStart(event)}
                             onTouchMove={(event) => handleTouchMove(event)}
                             onTouchEnd={() => handleTouchEnd(4)}/>
                        <img id="i5" className="Image" src="/img/img5.jpg"
                             onTouchStart={(event) => handleTouchStart(event)}
                             onTouchMove={(event) => handleTouchMove(event)}
                             onTouchEnd={() => handleTouchEnd(5)}/>
                        <img id="i6" className="Image" src="/img/img6.jpg"
                             onTouchStart={(event) => handleTouchStart(event)}
                             onTouchMove={(event) => handleTouchMove(event)}
                             onTouchEnd={() => handleTouchEnd(6)}/>
                        <img id="i7" className="Image" src="/img/img7.jpg"
                             onTouchStart={(event) => handleTouchStart(event)}
                             onTouchMove={(event) => handleTouchMove(event)}
                             onTouchEnd={() => handleTouchEnd(7)}/>
                        <img id="i8" className="Image" src="/img/img8.jpg"
                             onTouchStart={(event) => handleTouchStart(event)}
                             onTouchMove={(event) => handleTouchMove(event)}
                             onTouchEnd={() => handleTouchEnd(8)}/>
                        <img id="i9" className="Image" src="/img/img9.jpg"
                             onTouchStart={(event) => handleTouchStart(event)}
                             onTouchMove={(event) => handleTouchMove(event)}
                             onTouchEnd={() => handleTouchEnd(9)}/>
                        <img id="i10" className="Image" src="/img/img10.jpg"
                             onTouchStart={(event) => handleTouchStart(event)}
                             onTouchMove={(event) => handleTouchMove(event)}
                             onTouchEnd={() => handleTouchEnd(10)}/>
                    </div>
                </div>
                <button className="PrevButtonPanel" onClick={() => openImage(selectedImg-1, selectedImg)}>
                    <img className="PrevButton" src="/img/left_button.png"/>
                </button>
                <button className="NextButtonPanel" onClick={() => openImage(selectedImg+1, selectedImg)}>
                    <img className="NextButton" src="/img/right_button.png"/>
                </button>
            </div>

        </div>
        </RenderAfterNavermapsLoaded>
    );
}


export default App;
