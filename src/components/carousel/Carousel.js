import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from '../../assets/images';

export const CarouselItem = ({ product, children, width, gap=12 }) => {
    const { img, name, price } = product;

    const style = {
        carouselItem: {
            color: '#333',
            fontFamily: "Arial",
            textAlign: 'left',
            marginRight: `${gap}px`
        },
        img: {
            width: width,
            height: 'auto'
        },
        name: {
            fontSize: "14px",
        },
        price: {
            fontSize: "10px",
            marginTop: '5px'
        }
    };

    return (
        <div className="carousel-item" style={style.carouselItem}>
            <img className='product-img' style={style.img} src={img ?? null}></img>
            <div className='product-name' style={style.name}>{name ?? ''}</div>
            <div className='product-price' style={style.price} >${price ?? ''}</div>
        </div>
    );
};

const Carousel = (props) => {
    const { children, cardWidth = 200, visibleCount = 4, gap = 12 } = props;
    const [activeIndex, setActicveIndex] = useState(0);
    const itemCount = React.Children.count(children);

    const style = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            width: `${(cardWidth + gap) * visibleCount + 100}px`,
            margin: 'auto'
        },
        arrows: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '100%'
        },
        carousel: {
            width: `${(cardWidth + gap) * visibleCount}px`,
            position: 'relative',
            overflow: 'hidden'
        },
        inner: {
            display: 'flex',
            whiteSpace: 'nowrap',
            transition: 'transform 0.3s',
            transform: `translateX(-${activeIndex * (cardWidth + gap)}px)`
        },
        arrowBtn: {
            width: "25px",
            padding: '12px',
        }
    };

    const updateIndex = (newIndex) => {
        if (newIndex < 0) newIndex = itemCount - visibleCount;
        else if (newIndex > itemCount - visibleCount) newIndex = 0;
        setActicveIndex(newIndex);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            updateIndex(activeIndex + 1);
        }, 3000);

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    });

    return (
        <div style={style.container}>
            <div className='carousel' style={style.carousel} >
                <div className='inner' style={style.inner} >
                    {React.Children.map(children, (child, index) => {
                        return React.cloneElement(child, { width: `${cardWidth}px`, gap:gap });
                    })}
                </div>
            </div>
            <div style={style.arrows}>
                <img
                    className='arrow-left'
                    style={style.arrowBtn}
                    src={ArrowLeft}
                    onClick={() => updateIndex(activeIndex - 1)}
                />
                <img
                    className='arrow-right'
                    style={style.arrowBtn}
                    src={ArrowRight}
                    onClick={() => updateIndex(activeIndex + 1)}
                />
            </div>
        </div>
    )
}

export default Carousel;