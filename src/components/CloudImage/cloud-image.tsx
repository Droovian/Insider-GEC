"use client";
import { CldImage } from "next-cloudinary";
import React from "react";

interface CloudImageProps {
    src: string;
    alt: string;
   
}

export function CloudImage({src, alt} : CloudImageProps){
    return (
        <CldImage
            src={src}
            alt="alt"
            crop="fill"
            width= "400"
            height="300"
            sizes="50w"
            className="object-cover"
        />
    )
   
}