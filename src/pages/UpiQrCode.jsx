```jsx
import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

const UpiQrCode = ({ upiId, size = 240 }) => {
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    if (!upiId || !/^[^@\s]+@[^@\s]+$/.test(upiId.trim())) {
      setQrCode("");
      return;
    }

    const upiUrl = `upi://pay?pa=${encodeURIComponent(
      upiId.trim()
    )}&pn=${encodeURIComponent("Test Merchant")}&cu=INR`;

    QRCode.toDataURL(upiUrl, {
      width: size,
      margin: 1,
      errorCorrectionLevel: "H",
    })
      .then(setQrCode)
      .catch(() => setQrCode(""));
  }, [upiId, size]);

  return (
    <div
      style={{
        width: size + 24,
        height: size + 24,
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {qrCode && (
        <img
          src={qrCode}
          alt={`UPI QR Code for ${upiId}`}
          width={size}
          height={size}
          style={{
            display: "block",
            maxWidth: "100%",
            height: "auto",
          }}
        />
      )}
    </div>
  );
};

export default UpiQrCode;
```
