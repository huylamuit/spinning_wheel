import React, { useState } from "react";
import "./wheel.css";

const SpinningWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPointer, setCurrentPointer] = useState(45);

  const segments = [
    "Mew",
    "HLamb",
  ];

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedItem("")
    const segmentCount = segments.length; // Tổng số ô
    const segmentAngle = 360 / segmentCount; // Góc mỗi ô
    const randomSegment = Math.random() * segmentCount; // Giá trị ngẫu nhiên thập phân
    const additionalRotation = randomSegment * segmentAngle; // Góc ngẫu nhiên của ô
    const totalRotation = 3600 + additionalRotation; // Tổng góc quay (nhiều vòng + ô thắng)

    const spinDuration = 4000 + Math.random() * 1000; // Random từ 4000ms đến 5000ms

    const pointer = document.querySelector(".pointer");

    // Tắt hiệu ứng chuyển động để reset về vị trí bắt đầu
    pointer.style.transition = "none"; // Tắt hiệu ứng quay
    pointer.style.transform = `rotate(${currentPointer}deg)`; // Reset cây kim về vị trí ban đầu

    // Để hiệu ứng reset hoàn thành trước khi quay tiếp
    setTimeout(() => {
      pointer.style.transition = `transform ${spinDuration}ms cubic-bezier(0.17, 0.67, 0.83, 0.67)`; // Bật lại hiệu ứng quay với thời gian ngẫu nhiên
      pointer.style.transform = `rotate(${currentPointer + totalRotation}deg)`; // Quay đến góc mới

      // Sau khi quay xong, xác định kết quả và trạng thái quay
      setTimeout(() => {
        const finalRotation = (currentPointer + totalRotation) % 360; // Lấy góc cuối cùng
        const winningIndex = Math.floor(finalRotation / segmentAngle); // Tính ô thắng dựa trên góc quay cuối cùng
        setCurrentPointer(currentPointer + totalRotation); // Cập nhật góc hiện tại
        setSelectedItem(segments[winningIndex]); // Cập nhật ô thắng
        setIsSpinning(false); // Kết thúc trạng thái quay
      }, spinDuration); // Sử dụng thời gian quay ngẫu nhiên
    }, 50); // Thời gian chờ reset (50ms)
  };
  const returnResult = ()=>{
    const HLamb =[
        "Lewlew trúng Huy ùi nha^^",
        "Huy trả lời lẹ cho tui:))",
        "Huy chọn Truth hay Dare đâyy",
        "Huy dám chọn Dare hong:>"
    ]
    const Mew = [
        "Ơ, sao lại trúng Mewwww",
        "Mew bít ùi, để Mew chọn:<",
        "Huhu câu này khó cho Mew wooo",
        "Mew chọn cái nào đây taaa"
    ]
    const randomNumber = Math.floor(Math.random() * 4); // Generates a random number between 0 and 3
    if(selectedItem === "Mew"){
        return Mew[randomNumber]
    }
    else{
        return HLamb[randomNumber]
    }
  }

  return (
    <div className="spinning-wheel-container">
        <h1 class="title">VÒNG QUAY MAY MẮN</h1>
      <div className="wheel-container">
        <div className="wheel">
          {segments.map((item, index) => (
            <div
              key={index}
              className="segment"
              style={{
                transform: `rotate(${index * 180}deg)`, // Góc chia đều
                backgroundColor: index % 2 === 0 ? "#F6D6D6" : "#7BD3EA", // Màu sắc cho các ô
              }}
            >
              {index % 2 == 0 ? <img
                src="/MewMewIcon.png" // Đảm bảo đường dẫn đúng tới ảnh
                alt={item}
                className="segment-img"
              /> :
              <img
              style={{
                transform: `rotate(${index * 180}deg)`, // Góc chia đều
             
              }}
              src="/HLamb.png" // Đảm bảo đường dẫn đúng tới ảnh
              alt={item}
              className="segment-img"
            />}
            </div>
          ))}
        </div>
        <div className="pointer" />
        <button className="spin-button" onClick={spinWheel} disabled={isSpinning}>
          Quay
        </button>
      </div>
      
      {selectedItem && <div className="result">{returnResult()}</div>}
    </div>
  );
};

export default SpinningWheel;
