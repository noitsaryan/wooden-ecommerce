"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import axios from "axios";

export default function AddReview({ sku, getReviews }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [rating, setRating] = useState(0);
  const [reviewTxt, setReviewTxt] = useState("");
  const [userId, setUserId] = useState("");

  const getUser = async () => {
    try {
      const res = await axios.get("/api/get-current-user");
      console.log(res)
      setUserId(res && res.data.data._id);
    } catch (error) {
      console.log(error.message);
    }
  };
  const CreateReview = async () => {
    try {
      const res = await axios.post("/api/create-review", {
        userId,
        comment:reviewTxt,
        sku,
        rating,
      });
      getReviews();

      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Button onPress={onOpen} className="bg-Primary text-white" size="sm">
        Add a Review
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Rating and Review
              </ModalHeader>
              <ModalBody>
                <p>
                  <Rating
                    style={{ maxWidth: 180 }}
                    value={rating}
                    onChange={setRating}
                  />
                </p>
                <Textarea
                  label="Write a review"
                  placeholder="Great Product.."
                  className="w-full"
                  onChange={(e) => setReviewTxt(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  onClick={() => CreateReview()}
                  color="primary"
                  onPress={onClose}
                  className="bg-Primary"
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
