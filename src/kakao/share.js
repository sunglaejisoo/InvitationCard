import React, { useEffect } from 'react'

const KakaoShareButton = () => {
    useEffect(() => {
        createKakaoButton()
    }, [])

    const createKakaoButton = () => {
        if (window.Kakao) {
            const kakao = window.Kakao

            if (!kakao.isInitialized()) {
                kakao.init("")
            }

            kakao.Link.createDefaultButton({
                container: '#kakao-link-btn',
                objectType: 'feed',
                content: {
                    title: '[모바일청첩장] 성래♥지수 결혼식에 초대합니다!',
                    description: '23.02.04 아모리스 역삼 11:30 AM',
                    imageUrl: "",
                    link: {
                        mobileWebUrl: window.location.href,
                        webUrl: window.location.href,
                    },
                },
                buttons: [
                    {
                        title: '모바일청첩장 보기',
                        link: {
                            mobileWebUrl: window.location.href,
                            webUrl: window.location.href,
                        },
                    }
                ],
            })
        }
    }

    return (
        <div className="KakaoShare" id="kakao-link-btn">
            <text className="KakaoShareText">카카오톡으로 공유하기</text>
            <button className="KakaoShareButton">
                <img className="KakaoShareIcon" src={"/img/kakaoshare_button.png"} alt="kakao-share-icon" />
            </button>
        </div>
    )
}

export default KakaoShareButton