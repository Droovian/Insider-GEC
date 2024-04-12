"use client";
import { CldImage } from "next-cloudinary";
import React from "react";

interface CloudImageProps {
    src: string;
    alt: string;
    width: number;
    height:number;
}

export function CloudImage({src, alt} : CloudImageProps){
    return (
        <CldImage
            src={src}
            alt="alt"
            crop="fill"
            width= "500"
            height="200"
            sizes="50w"
            
        />
    )
   
}