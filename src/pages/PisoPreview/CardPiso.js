const CardPiso = (product) => {
    return (
        <div className="product-item">
            <div className="product-item-content">
                <div className="p-mb-3">
                    <img src={`showcase/demo/images/product/${product.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.name} className="product-image" />
                </div>
                <div>
                    <h4 className="p-mb-1">{product.name}</h4>
                    <h6 className="p-mt-0 p-mb-3">${product.price}</h6>
                    <span className={`product-badge status-${product.inventoryStatus.toLowerCase()}`}>{product.inventoryStatus}</span>
                    <div className="car-buttons p-mt-5">
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CardPiso;