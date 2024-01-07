import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { FaExpand } from "react-icons/fa";

export default function ImageFullPreview({ images, imageNo, setImageNo }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} variant="flat" isIconOnly>
        <p>
          <FaExpand className="text-2xl" />
        </p>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="3xl"
        backdrop="blur"
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="flex gap-2 text-4xl items-center justify-center relative">
                  <Image
                    width={500}
                    height={500}
                    alt="Product_Image"
                    className="w-full h-full bg-slate-100 rounded-md transition-all"
                    src={(images && images) || "/"}
                  />
                  <div className="absolute flex items-center  w-full justify-between px-3 text-4xl text-black drop-shadow-m font-semibold">
                    <RiArrowLeftSLine
                      className="cursor-pointer"
                      onClick={() =>
                        setImageNo(imageNo === 0 ? 0 : imageNo - 1)
                      }
                    />
                    <RiArrowRightSLine
                      className="cursor-pointer"
                      onClick={() =>
                        setImageNo(
                          imageNo === images && images.length - 1
                            ? 0
                            : imageNo + 1
                        )
                      }
                    />
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
