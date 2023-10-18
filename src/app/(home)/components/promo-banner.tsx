import Image, { ImageProps } from "next/image";

const PromoBanner = ({ alt, ...props }: ImageProps) => {
  return (
    <Image
    className="h-auto w-full px-5"
    sizes="100vw"
    width={350} height={150} 
    alt={alt}
    {...props}
  />
  );
}

export default PromoBanner;
