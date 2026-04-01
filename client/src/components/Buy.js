import React, { useState } from "react";
import { ethers } from "ethers";

const Buy = ({ state }) => {
  const [loading, setLoading] = useState(false);
  const buyChai = async (event) => {
    event.preventDefault();
    const { contract } = state;
    if (!contract) {
      alert("Wallet not connected. Please connect MetaMask first.");
      return;
    }
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    console.log(name, message, contract);
    const amount = { value: ethers.utils.parseEther("0.001") };
    try {
      setLoading(true);
      const transaction = await contract.buyChai(name, message, amount);
      await transaction.wait();
      console.log("Transaction is done");
      alert("Payment successful — transaction confirmed.");
    } catch (err) {
      console.error(err);
      const msg = err && err.message ? err.message : String(err);
      alert("Payment failed: " + msg);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
        <form onSubmit={buyChai}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Your Name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <input
              type="text"
              className="form-control"
              id="message"
              placeholder="Enter Your Message"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!state.contract || loading}
          >
            {loading ? "Processing..." : "Pay"}
          </button>
        </form>
      </div>
    </>
  );
};
export default Buy;
