import { Link } from 'react-router-dom';
import { Card, Carousel, Container, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Home(props) {
    const [Products, setProducts] = useState([])
    const [ProductFind, setProductFind] = useState([])
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/products/')
            .then((res) => {
                const temp = res?.data?.data?.filter((e) => (e.deleted !== true))
                setProducts(temp)
                setProductFind(temp)
            })
    }, [])
    const onChange = (e) => {
        const temp = ProductFind.filter(element => element.sp_name.toLowerCase().includes(e.target.value.toLowerCase()))
        setProducts(temp)
    }
    function renderProducts(item, idx) {
        if (item.s_status && item.sp_sl !== 0) {
            return (
                <Col xs={12} md={4} sm={6} key={idx} className='g-3'>
                    <Card className='card border-success border border-2' style={{ height: "540px" }}>
                        <Link to={`/detail/${item.sp_id}`}>
                            <Card.Img variant="top" src={`/image/SanPham/${item.sp_image}`} style={{ width: "auto", height: "400px", maxHeight: "300px" }} />
                        </Link>
                        <Card.Body className='bg-light'>
                            <Card.Title>{item.sp_name}</Card.Title>
                            <Card.Text className='text-line'>
                                <span className='text-primary fw-bold'>{new Intl.NumberFormat('vi').format(item.sp_price)} $</span> <br />
                                <span>{item.sp_describe}</span>
                            </Card.Text>
                            <Card.Title >
                                <Link className="text-primary fw-bolder" to={`/detail/${item.sp_id}`} >Deltail</Link>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            )
        }
        else {
            return (
                <Col xs={12} md={4} sm={6} key={idx} className='g-3'>
                    <Card className='card border-success border border-2' style={{ height: "540px" }}>
                        <Card.Img variant="top" src={`/image/SanPham/${item.sp_image}`} style={{ width: "auto", height: "400px", maxHeight: "300px" }} />
                        <Card.Body className='bg-light'>
                            <Card.Title>{item.sp_name}</Card.Title>
                            <Card.Text className='text-line'>
                                <span className='text-primary fw-bold'>{new Intl.NumberFormat('vi').format(item.sp_price)} $</span> <br />
                                <span>{item.sp_describe}</span>
                            </Card.Text>
                            <Card.Title >
                                <Link className="text-danger fw-bolder" to={`/detail/${item.sp_id}`} style={{ pointerEvents: "none" }}>Sold out</Link>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            )
        }
    }
    return (
        <div>
            <div className='banner'>
                <Carousel>
                    <Carousel.Item>
                        <img
                            height={700}
                            className="d-block w-100"
                            src="/image/SanPham/sp_image-1714401435644.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption className='info-banner' style={{ color: "black" }}>
                            <h1>Yonex Muscle Power Tour (MP-Tour) Badminton Racket</h1>
                            <p>The new Yonex Muscle Power Tour (MP-Tour) badminton racket is a slim shaft design racket and uses Yonex's performance.</p>
                            <p>Muscle Power frame technology similar to Yonex Muscle Power 99 (MP-99) and Titanium 10 (Ti-10) badminton rackets</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            height={700}
                            className="d-block w-100"
                            src="/image/SanPham/sp_image-1714402457393.jpg"
                            alt="Second slide"
                        />

                        <Carousel.Caption className='info-banner' style={{ color: "black" }}>
                            <h1>Yonex Mavis 350 Yellow (Fast Speed) Nylon Shuttlecock</h1>
                            <p>Yonex Mavis 350 is the official nylon shuttlecock used throughout high school teams and tournaments in the Northern California.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            height={700}
                            className="d-block w-100"
                            src="/image/SanPham/sp_image-1714403738876.jpg"
                            alt="Third slide"
                        />

                        <Carousel.Caption className='info-banner' style={{ color: "black" }}>
                            <h1>Yonex Power Cushion 37 Wide Navy Yellow Badminton Shoess</h1>
                            <p>
                                The Yonex Power Cushion 37 Wide Navy Yellow is a soft, comfortable, and lightweight performance badminton shoes at an economical price.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            <Container fluid>
                <Row className='d-flex m-5'>
                    <div className='mxx-auto'>
                        <input type="text"
                            className="form-control w-50 mx-auto"
                            placeholder="Searching product"
                            onChange={onChange}
                            style={{ height: "50px" }}
                        />
                    </div>
                </Row>
                <Row className='m-0'>
                    <h1 style={{ textTransform: "uppercase", color: "rgb(200,16,46)" }}>New Products</h1>
                    {Products.map((item, idx) => {
                        return idx < 6 && (
                            renderProducts(item, idx)
                        )
                    })}
                </Row>
                <Row className='mt-3 mb-2 g-3'>
                    <h1 style={{ textTransform: "uppercase", color: "rgb(200,16,46)" }}>Highly recommend </h1>
                    {Products.map((item, idx) => {
                        return idx >= 6 && idx < 12 && (
                            renderProducts(item, idx)
                        )
                    })}
                </Row>
            </Container>
        </div>

    );
}

export default Home;