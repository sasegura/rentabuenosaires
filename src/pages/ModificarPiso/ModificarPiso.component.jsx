import React from "react";

import { InputText } from "primereact/inputtext";
import Imagen from "pages/Adicionar/ImagenUpload.component";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { InputSwitch } from "primereact/inputswitch";

const ModificarPiso  = (props) => {

    return ( 
        <div visible={productDialog} id="esteId" style={{ width: '950px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
            {product.image && 
                <img 
                    src={`showcase/demo/images/product/${product.image}`} 
                    onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} 
                    alt={product.image} 
                    className="product-image"
                />}

                <div className="p-grid">
                    <div className="p-col-12 p-md-12 p-lg-7">
                        
                        <div className="p-grid">
                            
                            <div className="p-field p-col-8">
                                <label htmlFor="name">Dirección</label>
                                <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                                {submitted && !product.name && <small className="p-error">Introduzca la dirección.</small>}
                            </div>

                            <div className="p-field p-col-3">
                                <label htmlFor="precio">Precio</label>
                                <InputNumber id="precio" value={product.precio} onValueChange={(e) => onInputNumberChange(e, 'precio')} mode="currency" currency="EUR" locale="en-US" />
                            </div>

                        </div>

                        <div className="p-field">
                            <label htmlFor="description">Descripción</label>
                            <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                        </div>

                        <div className="p-grid">
                            <div className="p-field p-col-3">
                                
                                <div className="p-field ">
                                    <label htmlFor="bannos">Nº Baños</label>
                                    <InputNumber id="bannos" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                                </div>
                                
                                <div className="p-field">
                                    <label htmlFor="habitaciones">Nº Habitaciones</label>
                                    <InputNumber id="habitaciones" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly />
                                </div>

                            </div>

                            <div className="p-col-3">

                                <div className="p-field ">
                                    <label htmlFor="personas">Nº Personas</label>
                                    <InputNumber id="personas" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly />
                                </div>

                                <div className="p-field">
                                    <label htmlFor="metros">Metros cuadrados</label>
                                    <InputNumber id="metros" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly />
                                </div>

                            </div>

                            <div className="p-col-6">

                                <div className="switch">
                                    <label htmlFor="binary">WiFi</label>
                                    <InputSwitch checked={wifi} onChange={(e) => setWifi(e.value)} />
                                </div>

                                <div className="switch">
                                    <label htmlFor="binary">Aire Acondicionado</label>
                                    <InputSwitch checked={aire} onChange={(e) => setAire(e.value)} />
                                </div>

                                <div className="switch">
                                    <label htmlFor="binary">Calefacción</label>
                                    <InputSwitch checked={calefaccion} onChange={(e) => setCalefaccion(e.value)} />
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="p-col-12 p-md-12 p-lg-5">
                        <label htmlFor="binary">Subir imágenes del piso</label>
                        <Imagen/>
                    </div>

                </div>
            </div>

    )}

    export default ModificarPiso;

