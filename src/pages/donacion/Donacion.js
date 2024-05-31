import React from "react";
import "./donacion.css";

export default function donacion() {
  return (
    <div className="container-donacion">
      <div class="card cart">
        <label class="title">PAGO</label>
        <div class="steps">
          <div class="step">
            <div>
              <span>ENVÍO</span>
              <p>Calle: Av. Siempreviva 1234</p>
              <p>Buenos Aires, Argentina</p>
            </div>

            <div>
              <span>MÉTODO DE PAGO</span>
              <p>Visa</p>
              <p>**** **** **** 4243</p>
            </div>

            <div class="promo">
              <span>¿TIENES UN CÓDIGO PROMOCIONAL?</span>
              <form class="form">
                <input
                  type="text"
                  placeholder="Introduce un Código Promocional"
                  class="input_field"
                />
                <button>Aplicar</button>
              </form>
            </div>

            <div class="payments">
              <span>PAGO</span>
              <div class="details">
                <span>Subtotal:</span>
                <span>$240.00</span>
                <span>Envío:</span>
                <span>$10.00</span>
                <span>Impuesto:</span>
                <span>$30.40</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card checkout">
        <div class="footer">
          <label class="price">$280.40</label>
          <button class="checkout-btn">Pagar</button>
        </div>
      </div>
    </div>
  );
}
