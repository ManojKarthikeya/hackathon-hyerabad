import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Card,
	CardBody,
	CardFooter,
	CardGroup,
	Container,
	Row,
} from "reactstrap";
import { getOrders } from "../store/actions";
import UpdateProfile from "./UpdateProfile";

export default function Profile({ user }) {
	const dispatch = useDispatch();
	const [orderList, setOrderList] = useState([]);

	const { orders } = useSelector((state) => ({
		orders: state.reducer.orders,
	}));

	useEffect(() => {
		dispatch(getOrders());
	}, [user, dispatch]);

	useEffect(() => {
		setOrderList(orders);
	}, [orders, user]);

	if (!user) {
		return (
			<Container fluid>
				<div
					style={{
						position: "absolute",
						left: "50%",
						top: "50%",
						transform: "translate(-50%,-50%)",
					}}
				>
					<div className="display-5">
						Please Login before you can view your profile.
					</div>
				</div>
			</Container>
		);
	} else {
		return (
			<div>
				<Container>
					<div className="mx-3 my-3">
						<div className="display-5" style={{ fontWeight: 700 }}>
							My Profile
						</div>
						<div
							className="text-secondary"
							style={{ fontWeight: 700 }}
						>
							What can we help you with?
						</div>
					</div>
					<Row>
						<div className="mx-5 my-3">
							<div
								className="display-6 text-secondary"
								style={{ fontWeight: 700 }}
							>
								My Orders
							</div>
							<CardGroup className="w-100 d-flex p-3 flex-wrap">
								{orderList.map((order) => (
									<Card
										className=""
										style={{
											borderRadius: 0,
											minHeight: "30vh",
											maxWidth: "25%",
										}}
									>
										<CardBody className="d-flex flex-column w-100">
											<div
												className="d-flex justify-content-between w-100"
												style={{ fontWeight: 700 }}
											>
												<div>
													Order Id :{" "}
													<span className="text-secondary">
														{order.orderId}
													</span>
												</div>
												<div>{order.orderDate}</div>
											</div>
											<div className="d-flex w-100 flex-wrap">
												{order.products.map(
													(product) => (
														<div className="w-100 m-4">
															<div
																style={{
																	fontWeight: 600,
																}}
															>
																<div>
																	<span>
																		Product
																		Name :
																	</span>
																	{" " +
																		product.DisplayName}
																</div>
																<div>
																	<span>
																		Price :
																	</span>
																	{" " +
																		product.ListPrice}
																</div>
																<div>
																	<span>
																		Size
																		:
																	</span>
																	{" " +
																		product.productSize}
																</div>
															</div>
														</div>
													)
												)}
											</div>
										</CardBody>
										<CardFooter>
											<div
												className="text-end"
												style={{
													fontWeight: 700,
												}}
											>
												Total Price : $
												{order.totalPrice}{" "}
											</div>
										</CardFooter>
									</Card>
								))}
							</CardGroup>
						</div>
					</Row>
					<Row>
						<div className="mx-5 my-3">
							<div
								className="display-6 text-secondary"
								style={{ fontWeight: 700 }}
							>
								Change Password
							</div>
							<div className="p-3">
								<UpdateProfile />
							</div>
						</div>
					</Row>
					<Row>
						<div className="mx-5 my-3">
							{/* <div
								className="display-6 text-secondary"
								style={{ fontWeight: 700 }}
							>
								Contact Us
							</div> */}
						</div>
					</Row>
				</Container>
			</div>
		);
	}
}
