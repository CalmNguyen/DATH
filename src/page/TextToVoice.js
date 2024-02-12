import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AudioPlayer from 'react-audio-player';
import { Flex, Layout, Row } from 'antd';
import Header from './Header';
import { Input } from 'antd';
import Select from '../component/Select'
import '../css/style.css'
const { Search } = Input;
const { Footer, Sider, Content } = Layout;
const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 40,
    paddingInline: 40,
    lineHeight: '40px',
    backgroundColor: '#4096ff',
};

const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: 'white',
};

const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#1677ff',
};

const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#4096ff',
    height: 40
};

const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: 'calc(100% - 8px)',
    maxWidth: 'calc(100% - 8px)',
    minHeight: 'calc(100% - 0px)'
};
// import Tesseract from 'tesseract.js';
const TextToVoice = () => {
    const [inputText, setInputText] = useState('');
    const [captchaText, setCaptchaText] = useState('');
    const [audioSrc, setAudioSrc] = useState('');
    const [refreshImage, setRefreshImage] = useState(false);
    const [captchaImage, setCaptchaImage] = useState('');
    const [listAudio, setListAudio] = useState([])

    const handleInputChange = (e) => {
        setInputText(e.target.value);
        setJson({ ...json, "user_input_text": e.target.value });
    };
    const wordProcessing = async (sentence) => {
        if (sentence == '')
            return []
        let listSentence = []
        sentence = sentence.replace('\n', '')
        const NUMBER_SPLIT = 7900
        if (sentence.length < NUMBER_SPLIT) {
            listSentence.push(sentence)
        }
        else {

            let begin = 0, end = -1
            for (let i = 0; i <= Number(sentence.length / NUMBER_SPLIT); i++) {
                begin = end + 1
                if (end + NUMBER_SPLIT > sentence.length - 1) {
                    end = sentence.length - 1
                }
                else {
                    end += NUMBER_SPLIT
                }
                listSentence.push(sentence.substring(begin, end))
                // for (let j = end; j > begin; j++) {
                //     if (sentence[end] == '.' || sentence[end] == '!' || sentence[end] == '?') {
                //         listSentence.push(sentence.substring(begin, end))
                //         end = j;
                //         break;
                //     }
                // }
            }
        }
        return listSentence
    }
    const handleInputCaptcha = (e) => {
        console.log(e.target.value)
        setCaptchaText(e.target.value);
        setJson({ ...json, "user_input_captcha_text": e.target.value });
    };

    const [json, setJson] = useState({
        "user_uuid_text": "95b56c3f-8809-4353-b18e-7383b875dd98",
        "user_input_text": "Chào anh chị trong nhóm",
        "user_select_language_id": "vi-vn",
        "user_select_announcer_id": "450",
        "user_select_tts_setting_audio_format": "mp3",
        "user_select_tts_setting_speed": "1.15",
        "user_select_tts_setting_volume": "0",
        "user_select_tts_setting_pitch": "1",
        "user_input_captcha_text": "4230",
        "user_input_paragraph_pause_time": "-1",
        "user_select_tts_voice_high_quality": "0"
    });
    const handleConvertTextToSpeech = async () => {
        try {
            const listSentence = await wordProcessing(inputText);
            console.log(listSentence.length);

            // Tạo mảng promises cho tất cả các API request
            const audioPromises = listSentence.map(async (sentence) => {
                const API = "https://ttsmaker.com/api/create-tts-order";

                const headers = new Headers({
                    'Content-Type': 'application/json',
                    'Cookie': 'uuid=95b56c3f-8809-4353-b18e-7383b875dd98; _ga=GA1.1.106640793.1699057861; fpestid=4QmD5nlcWsAkGa9BFQJjJEpU5CedQQ0RC5Qbel99iKSmXzEvQC1ZIefwcmjR1iitGFKZxw; _clck=1hw99o9%7C2%7Cfik%7C0%7C1403; cf_clearance=rcD3F_LO2ymvgDY4zdUiyyH5dRYCE6kOxwSA7kSUiiA-1705753934-1-ASNS2Mj88DXJWqyf7PuVA/BwpytWDrhz89Aumc+33m8ylFvtz5TYYwUWGfE7z4+1rM8b9pDMy9pDXy/QpDvlLIk=; __gads=ID=6b83bab849055122:T=1699057860:RT=1705769771:S=ALNI_Mag04DnOYRg3NNvsIfyhzLWA_BJqA; __gpi=UID=00000c7f5dccef10:T=1699057860:RT=1705769771:S=ALNI_MbryloXDuxeQB5-FpQ-KMkw6VnL-w; _clsk=17icoki%7C1705769776119%7C1%7C1%7Cv.clarity.ms%2Fcollect; Hm_lvt_620f68368c2bc5df0b46b149a685a51c=1703261343,1703422380,1705753939,1705769777; Hm_lpvt_620f68368c2bc5df0b46b149a685a51c=1705769777; FCNEC=%5B%5B%22AKsRol-7iCQm6WnkAp-74dIa2PCOliKvLg6lVP9h0sbGIUtKRd8M3ueVoBrI6t9jJHTYxkzY0Ak7sfK3-gF1CYFaB2ntpqTOPrMhW92Il6iLsZ4xLnHQoBDctr50cqHVaKD6w1QPLRa50HLR1hR_BBF5i_zw-dKoGw%3D%3D%22%5D%5D; _ga_MXNCR42D3E=GS1.1.1705768307.8.1.1705769809.0.0.0',
                });

                const response = await fetch(API, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ ...json, user_input_text: sentence }),
                });

                const responseData = await response.json();
                return responseData.auto_stand_url;
            });

            // Chờ tất cả các promises hoàn thành
            const listTempAudio = await Promise.all(audioPromises);

            // listTempAudio là một mảng chứa tất cả các URL audio
            console.log(listTempAudio);

            // Nếu bạn muốn thực hiện bất kỳ hành động nào khác với listTempAudio, bạn có thể thực hiện ở đây.

            // Cập nhật danh sách audio
            setListAudio(listTempAudio);
        } catch (error) {
            console.error('Error converting text to speech:', error);
        }
    };

    const handleRefreshImage = () => {
        setRefreshImage(!refreshImage);
    };

    const sendImageToFlask = async () => {
        try {
            if (!captchaImage) {
                console.error('No image provided');
                return;
            }

            const response = await axios.get(captchaImage, { responseType: 'arraybuffer' });
            const imageData = new Uint8Array(response.data);

            const formData = new FormData();
            const imageBlob = new Blob([imageData]);
            formData.append('image', imageBlob);

            const flaskResponse = await axios.post('http://localhost:5000/analyze_image', formData);

            const result = flaskResponse.data.result;
            console.log(flaskResponse);
            setCaptchaResult(result);
        } catch (error) {
            console.error('Error sending image to Flask:', error);
        }
    };



    useEffect(() => {
        setCaptchaImage(`https://ttsmaker.com/get_captcha?uuid=95b56c3f-8809-4353-b18e-7383b875dd98&rand=${Math.floor(Math.random() * 100000)}`);
    }, [refreshImage]);

    const [captchaResult, setCaptchaResult] = useState('');
    // const handleImageLoad = async (imgData) => {
    //     const result = await ReactOcr.ocr(imgData);
    //     console.log(result);
    // };
    const [text, setText] = useState('');

    // const handleImageUpload = async (e) => {
    //     const imageFile = e.target.files[0];

    //     if (!imageFile) {
    //         return;
    //     }

    //     const { data: { text } } = await Tesseract.recognize(
    //         imageFile,
    //         'vie', // Ngôn ngữ (có thể thay đổi tùy theo yêu cầu)
    //         { logger: (info) => console.log(info) } // Optional logger callback
    //     );

    //     setText(text);
    // };
    const handleSearch = (value) => {
        // Thực hiện hành động bạn muốn khi ấn nút Search
        console.log('Searching for:', value);

        // Bật/tắt trạng thái loading (nếu cần)
        setLoading(!loading);

        // Thực hiện các hành động khác dựa trên giá trị `value` hoặc thực hiện các yêu cầu API, ...
    };
    const [loading, setLoading] = useState(false)
    const optionsArray = [
        { value: 0.5, label: '⏪ 0.5x' },
        { value: 0.6, label: '⏪ 0.6x' },
        { value: 0.7, label: '⏪ 0.7x' },
        { value: 0.8, label: '⏪ 0.8x' },
        { value: 0.85, label: '⏪ 0.85x' },
        { value: 0.9, label: '⏪ 0.9x' },
        { value: 0.95, label: '⏪ 0.95x' },
        { value: 1.0, label: '1.0x (Default)' },
        { value: 1.05, label: '⏩ 1.05x' },
        { value: 1.1, label: '⏩ 1.1x' },
        { value: 1.15, label: '⏩ 1.15x' },
        { value: 1.2, label: '⏩ 1.2x' },
        { value: 1.25, label: '⏩ 1.25x' },
        { value: 1.3, label: '⏩ 1.3x' },
        { value: 1.4, label: '⏩ 1.4x' },
        { value: 1.5, label: '⏩ 1.5x' },
        { value: 2.0, label: '⏩ 2.0x' },
    ];
    //Thay đổi pitch giọng nói
    const optionsPitch = [
        { value: 2.0, label: '🔼 Super High pitch (+100%)' },
        { value: 1.5, label: '🔼 High pitch (+50%)' },
        { value: 1.25, label: '🔼 Medium-high pitch (+25%)' },
        { value: 1.1, label: '🔼 Slightly high pitch (+10%)' },
        { value: 1.05, label: '🔼 Slightly high pitch (+5%)' },
        { value: 1.0, label: 'Default (normal pitch)' },
        { value: 0.95, label: '🔽 Slightly low pitch (-5%)' },
        { value: 0.9, label: '🔽 Slightly low pitch (-10%)' },
        { value: 0.75, label: '🔽 Low pitch (-25%)' },
        { value: 0.5, label: '🔽 Super low pitch (-50%)' },
    ];
    //thời gian dừng
    const stopTime = [
        { value: -1, label: '🕒 0ms (eliminate pauses)' },
        { value: 50, label: '🕒 50ms' },
        { value: 100, label: '🕒 100ms' },
        { value: 200, label: '🕒 200ms' },
        { value: 0, label: 'Default (300ms)' },
        { value: 600, label: '🕒 600ms' },
        { value: 800, label: '🕒 800ms' },
        { value: 1000, label: '🕒 1000ms' },
        { value: 1200, label: '🕒 1200ms' },
        { value: 1500, label: '🕒 1500ms' },
        { value: 1800, label: '🕒 1800ms' },
        { value: 2000, label: '🕒 2000ms' },
        { value: 2500, label: '🕒 2500ms' },
        { value: 3000, label: '🕒 3000ms' },
        { value: 4000, label: '🕒 4000ms' },
        { value: 5000, label: '🕒 5000ms' },
        { value: 6000, label: '🕒 6000ms' },
        { value: 8000, label: '🕒 8000ms' },
        { value: 10000, label: '🕒 10000ms' },
    ];

    return (
        <div className='responsive-layout'>
            <Layout style={layoutStyle}>
                <Header style={headerStyle}>Header</Header>
                <Content >
                    <div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <div style={{ width: '60%', paddingTop: '10px' }} >
                                <textarea
                                    style={{ width: '100%', minHeight: 'calc(100vh - 116px)' }}
                                    placeholder='Nhập chữ viết'
                                    value={inputText}
                                    onChange={handleInputChange}
                                    maxLength={10000000}
                                // Thêm paddingTop để đưa text lên phía trên
                                />

                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', margin: 10 }}>
                                {listAudio.map((audioUrl, index) => (
                                    <div key={index} style={{ marginTop: 10 }}>
                                        {/* autoPlay */}
                                        <AudioPlayer src={audioUrl} controls />
                                    </div>
                                ))}
                                <div style={{ marginBottom: 10 }}>
                                    <label>Chọn tốc độ phát</label>
                                    <Select array={optionsArray} functionChange={(e) => {
                                        console.log(e.target.value)
                                        setJson({ ...json, user_select_tts_setting_speed: e.target.value })
                                    }} />
                                </div>
                                <div style={{ marginBottom: 10 }}>
                                    <label>Chọn độ pitch chỉ âm giọng</label>
                                    <Select array={optionsPitch} functionChange={(e) => setJson({ ...json, user_select_tts_setting_pitch: e.target.value })} />
                                </div>
                                <div style={{ marginBottom: 10 }}>
                                    <label>Chọn độ thời gian dừng</label>
                                    <Select array={stopTime} functionChange={(e) => setJson({ ...json, user_select_tts_voice_high_quality: e.target.value })} />
                                </div>
                                {captchaImage && (
                                    <div style={{ marginTop: 10 }} onClick={handleRefreshImage}>
                                        <img style={{ width: '100%', height: 60 }} src={captchaImage} alt="Captcha" />
                                        {/* <button onClick={sendImageToFlask}>Refresh captcha</button> */}
                                    </div>
                                )}
                                {/* {captchaResult && (
                                    <div>
                                        <p>Kết quả captcha: {captchaResult}</p>
                                    </div>
                                )} */}
                                <textarea
                                    placeholder='Nhập mã captcha'
                                    value={captchaText}
                                    onChange={handleInputCaptcha}
                                    maxLength={10000}
                                    style={{ marginTop: 10 }}
                                />
                                <div style={{ width: '100%', display: 'flex', alignItems: 'center', marginTop: 10 }}>
                                    <button style={{ width: '100%' }} onClick={handleConvertTextToSpeech}>Gửi yêu cầu</button>
                                </div>
                                <Input.Search
                                    placeholder="Nhập mã xác nhận"
                                    enterButton="Search"
                                    size="large"
                                    loading={loading}
                                    style={{ marginTop: 10 }}
                                    onSearch={handleSearch}
                                />
                            </div>
                        </div>



                        {/* <div>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                {text && <p>Chữ đọc được: {text}</p>}
            </div> */}
                    </div>

                </Content>

                {/* <Footer style={footerStyle}>Footer</Footer> */}
            </Layout>
        </div>
    );
};

export default TextToVoice;
