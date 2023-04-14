
export default function CustomIcon({ icon, color, grid }) {

    switch(icon){
        case "Tulip":
            return Tulip(color);
        case "Apple":
            return Apple(color);
        case "Path":
            if(!grid)
                return Path(color);
            return <></>
        case "Lemon":
            return Lemon(color);
        case "Rose":
            return Rose(color);
        case "Carrot":
            return Carrot(color);
        case "Pepper":
            return Pepper(color);
        case "Sunflower":
            return Sunflower(color);
        case "Cactus":
            return Cactus(color);
        case "Pond":
            return Pond(color);
        case "Sunrise":
            return Sunrise();
        case "Sunset":
            return Sunset();
    }


    return <>

        {Tulip(color)}



    </>

}

function Sunrise() {
    return <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_8_25)">
    <path d="M15.5331 10.0514C15.7479 10.1416 15.9026 10.335 15.9456 10.5627L16.8006 15.1991L21.437 16.0499C21.6647 16.0928 21.8581 16.2475 21.9483 16.4624C22.0385 16.6772 22.0127 16.9221 21.8795 17.1155L19.2026 20.9999L21.8795 24.8799C22.0127 25.0733 22.0385 25.3182 21.9483 25.5331C21.8581 25.7479 21.6647 25.9026 21.437 25.9456L16.8006 26.8006L15.9456 31.437C15.9026 31.6647 15.7479 31.8581 15.5331 31.9483C15.3182 32.0385 15.0733 32.0127 14.8799 31.8795L10.9999 29.2026L7.11977 31.8795C6.92641 32.0127 6.68149 32.0385 6.46665 31.9483C6.2518 31.8581 6.09712 31.6647 6.05415 31.437L5.19907 26.8006L0.562742 25.9456C0.335008 25.9026 0.141648 25.7479 0.0514139 25.5331C-0.0388205 25.3182 -0.0130392 25.0733 0.120164 24.8799L2.79712 20.9999L0.120164 17.1198C-0.0130392 16.9264 -0.0388205 16.6815 0.0514139 16.4666C0.141648 16.2518 0.335008 16.0971 0.562742 16.0541L5.19907 15.1991L6.05415 10.5627C6.09712 10.335 6.2518 10.1416 6.46665 10.0514C6.68149 9.96118 6.92641 9.98696 7.11977 10.1202L10.9999 12.7971L14.8799 10.1202C15.0733 9.98696 15.3182 9.96118 15.5331 10.0514ZM6.87485 20.9999C6.87485 19.9058 7.30945 18.8566 8.08304 18.083C8.85662 17.3094 9.90583 16.8749 10.9999 16.8749C12.0939 16.8749 13.1431 17.3094 13.9167 18.083C14.6903 18.8566 15.1249 19.9058 15.1249 20.9999C15.1249 22.0939 14.6903 23.1431 13.9167 23.9167C13.1431 24.6903 12.0939 25.1249 10.9999 25.1249C9.90583 25.1249 8.85662 24.6903 8.08304 23.9167C7.30945 23.1431 6.87485 22.0939 6.87485 20.9999ZM16.4999 20.9999C16.4999 19.5412 15.9204 18.1422 14.8889 17.1108C13.8575 16.0793 12.4585 15.4999 10.9999 15.4999C9.54116 15.4999 8.14221 16.0793 7.11076 17.1108C6.07931 18.1422 5.49985 19.5412 5.49985 20.9999C5.49985 22.4585 6.07931 23.8575 7.11076 24.8889C8.14221 25.9204 9.54116 26.4999 10.9999 26.4999C12.4585 26.4999 13.8575 25.9204 14.8889 24.8889C15.9204 23.8575 16.4999 22.4585 16.4999 20.9999Z" fill="black"/>
    </g>
    <g clip-path="url(#clip1_8_25)">
    <path d="M11.7062 1.29375C11.3156 0.903122 10.6812 0.903122 10.2906 1.29375L5.29062 6.29375C4.89999 6.68437 4.89999 7.31875 5.29062 7.70937C5.68124 8.1 6.31562 8.1 6.70624 7.70937L9.99999 4.4125V14C9.99999 14.5531 10.4469 15 11 15C11.5531 15 12 14.5531 12 14V4.4125L15.2937 7.70625C15.6844 8.09687 16.3187 8.09687 16.7094 7.70625C17.1 7.31562 17.1 6.68125 16.7094 6.29062L11.7094 1.29062L11.7062 1.29375Z" fill="black"/>
    </g>
    <defs>
    <clipPath id="clip0_8_25">
    <rect width="22" height="14" fill="white" transform="translate(0 10)"/>
    </clipPath>
    <clipPath id="clip1_8_25">
    <rect width="12" height="11" fill="white" transform="translate(5)"/>
    </clipPath>
    </defs>
    </svg>
    
}

function Sunset() {
    return <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_8_24)">
    <path d="M15.5331 11.0514C15.7479 11.1416 15.9026 11.335 15.9456 11.5627L16.8006 16.1991L21.437 17.0499C21.6647 17.0928 21.8581 17.2475 21.9483 17.4624C22.0385 17.6772 22.0127 17.9221 21.8795 18.1155L19.2026 21.9999L21.8795 25.8799C22.0127 26.0733 22.0385 26.3182 21.9483 26.5331C21.8581 26.7479 21.6647 26.9026 21.437 26.9456L16.8006 27.8006L15.9456 32.437C15.9026 32.6647 15.7479 32.8581 15.5331 32.9483C15.3182 33.0385 15.0733 33.0127 14.8799 32.8795L10.9999 30.2026L7.11977 32.8795C6.92641 33.0127 6.68149 33.0385 6.46665 32.9483C6.2518 32.8581 6.09712 32.6647 6.05415 32.437L5.19907 27.8006L0.562742 26.9456C0.335008 26.9026 0.141648 26.7479 0.0514139 26.5331C-0.0388205 26.3182 -0.0130392 26.0733 0.120164 25.8799L2.79712 21.9999L0.120164 18.1198C-0.0130392 17.9264 -0.0388205 17.6815 0.0514139 17.4666C0.141648 17.2518 0.335008 17.0971 0.562742 17.0541L5.19907 16.1991L6.05415 11.5627C6.09712 11.335 6.2518 11.1416 6.46665 11.0514C6.68149 10.9612 6.92641 10.987 7.11977 11.1202L10.9999 13.7971L14.8799 11.1202C15.0733 10.987 15.3182 10.9612 15.5331 11.0514ZM6.87485 21.9999C6.87485 20.9058 7.30945 19.8566 8.08304 19.083C8.85662 18.3094 9.90583 17.8749 10.9999 17.8749C12.0939 17.8749 13.1431 18.3094 13.9167 19.083C14.6903 19.8566 15.1249 20.9058 15.1249 21.9999C15.1249 23.0939 14.6903 24.1431 13.9167 24.9167C13.1431 25.6903 12.0939 26.1249 10.9999 26.1249C9.90583 26.1249 8.85662 25.6903 8.08304 24.9167C7.30945 24.1431 6.87485 23.0939 6.87485 21.9999ZM16.4999 21.9999C16.4999 20.5412 15.9204 19.1422 14.8889 18.1108C13.8575 17.0793 12.4585 16.4999 10.9999 16.4999C9.54116 16.4999 8.14221 17.0793 7.11076 18.1108C6.07931 19.1422 5.49985 20.5412 5.49985 21.9999C5.49985 23.4585 6.07931 24.8575 7.11076 25.8889C8.14221 26.9204 9.54116 27.4999 10.9999 27.4999C12.4585 27.4999 13.8575 26.9204 14.8889 25.8889C15.9204 24.8575 16.4999 23.4585 16.4999 21.9999Z" fill="black"/>
    </g>
    <g clip-path="url(#clip1_8_24)">
    <path d="M11.7062 11.7063C11.3156 12.0969 10.6812 12.0969 10.2906 11.7063L5.29062 6.70625C4.89999 6.31563 4.89999 5.68125 5.29062 5.29063C5.68124 4.9 6.31562 4.9 6.70624 5.29063L9.99999 8.5875V-0.999997C9.99999 -1.55312 10.4469 -2 11 -2C11.5531 -2 12 -1.55312 12 -0.999997V8.5875L15.2937 5.29375C15.6844 4.90313 16.3187 4.90313 16.7094 5.29375C17.1 5.68438 17.1 6.31875 16.7094 6.70938L11.7094 11.7094L11.7062 11.7063Z" fill="black"/>
    </g>
    <defs>
    <clipPath id="clip0_8_24">
    <rect width="22" height="14" fill="white" transform="translate(0 11)"/>
    </clipPath>
    <clipPath id="clip1_8_24">
    <rect width="12" height="13" fill="white" transform="matrix(1 0 0 -1 5 13)"/>
    </clipPath>
    </defs>
    </svg>
    
}

function Pond(color){
    return <svg  style={{ color: color }}   width="70px" height="70px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12,20a6,6,0,0,1-6-6c0-4,6-10.8,6-10.8S18,10,18,14A6,6,0,0,1,12,20Z" fill="currentColor"/>
    <rect width="24" height="24" fill="none"/>
  </svg>
}

function Cactus(color) {
    return <svg   style={{ color: color }}  height="70px" width="70px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 512 512"  >
   
   <path fill="currentColor"
    d="M408.243,128.683c-25.53,0-46.22,20.69-46.22,46.22v70.376c0,2.056-0.382,3.766-1.073,5.401
       c-1.02,2.431-2.843,4.652-5.086,6.152c-2.273,1.5-4.688,2.326-7.726,2.341h-22.364V73.4c0-40.542-32.858-73.4-73.4-73.4
       c-40.541,0-73.4,32.859-73.4,73.4v216.584h-13.563c-2.258,0-4.171-0.428-5.994-1.193c-2.708-1.133-5.161-3.159-6.834-5.642
       c-1.666-2.52-2.58-5.244-2.604-8.597v-36.22c0-25.522-20.69-46.22-46.22-46.22c-25.522,0-46.213,20.699-46.213,46.22v36.22
       c-0.008,14.763,3.016,29.07,8.493,41.996c8.222,19.423,21.846,35.799,39.026,47.42c17.164,11.628,38.17,18.462,60.346,18.448
       h13.563V512h146.8V351.606h22.364c14.554,0.008,28.65-2.978,41.396-8.372c19.146-8.11,35.282-21.524,46.738-38.47
       c11.456-16.918,18.207-37.623,18.185-59.484v-70.376C454.456,149.373,433.765,128.683,408.243,128.683z"/>
    </svg>
}

function Sunflower(color) {
    return <svg  style={{ color: color }}  width="70px" height="70px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zM5.6 10.25c0 1.38 1.12 2.5 2.5 2.5.53 0 1.01-.16 1.42-.44l-.02.19c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5l-.02-.19c.4.28.89.44 1.42.44 1.38 0 2.5-1.12 2.5-2.5 0-1-.59-1.85-1.43-2.25.84-.4 1.43-1.25 1.43-2.25 0-1.38-1.12-2.5-2.5-2.5-.53 0-1.01.16-1.42.44l.02-.19C14.5 2.12 13.38 1 12 1S9.5 2.12 9.5 3.5l.02.19c-.4-.28-.89-.44-1.42-.44-1.38 0-2.5 1.12-2.5 2.5 0 1 .59 1.85 1.43 2.25-.84.4-1.43 1.25-1.43 2.25zM12 5.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8s1.12-2.5 2.5-2.5zM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9z" fill="currentColor"/></svg>
}

function Tulip(color) {
    return <svg  style={{ color: color }}  width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path  d="M0 26.0679C0 30.8418 1.89642 35.4201 5.27208 38.7958C8.64773 42.1714 13.2261 44.0679 18 44.0679C18 39.294 16.1036 34.7156 12.7279 31.3399C9.35227 27.9643 4.7739 26.0679 0 26.0679ZM18 44.0679C22.7739 44.0679 27.3523 42.1714 30.7279 38.7958C34.1036 35.4201 36 30.8418 36 26.0679C31.2261 26.0679 26.6477 27.9643 23.2721 31.3399C19.8964 34.7156 18 39.294 18 44.0679ZM30 6.06787V16.0679C30 19.2505 28.7357 22.3027 26.4853 24.5532C24.2348 26.8036 21.1826 28.0679 18 28.0679C14.8174 28.0679 11.7652 26.8036 9.51472 24.5532C7.26428 22.3027 6 19.2505 6 16.0679V6.06787C7.48 6.06787 8.94 6.30787 10.32 6.84787C11.42 7.30787 12.4 7.98787 13.22 8.84787L18 4.06787L22.78 8.84787C23.6 7.98787 24.58 7.30787 25.68 6.84787C27.06 6.30787 28.52 6.06787 30 6.06787Z" fill="currentColor"/>
    </svg>
    
}

function Pepper(color){
    return <svg style={{ color: color }}  width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_8_3380)">
    <path d="M35.134 0.246244C36.0855 -0.278756 37.2832 0.0575725 37.8082 1.00914L38.202 1.72281C39.7852 4.56929 39.8262 7.93257 38.4809 10.7462C40.6711 13.0923 42 16.2341 42 19.6877C42 21.2052 41.7457 22.6654 41.2699 24.0189C40.7695 25.438 38.932 25.356 38.2512 24.0107L37.2914 22.0912C36.9551 21.4267 36.2742 21.0002 35.5277 21.0002H29.5312C28.4402 21.0002 27.5625 20.1224 27.5625 19.0314V12.4689C27.5625 11.3779 26.6848 10.5002 25.5938 10.5002H24.191C22.4438 10.5002 21.7301 8.5396 23.3051 7.80132C24.9949 7.00562 26.8816 6.56265 28.875 6.56265C31.1965 6.56265 33.3703 7.16148 35.257 8.21968C35.7082 6.72671 35.5605 5.06968 34.7648 3.64234L34.3711 2.92867C33.8461 1.9771 34.1824 0.779447 35.134 0.254447V0.246244ZM14.0437 28.3419L21.6562 13.1252H24.9375V19.6877C24.9375 21.8615 26.7012 23.6252 28.875 23.6252H35.1258L37.0863 27.5462C30.5402 36.4138 20.0402 42.0002 8.46562 42.0002H3.64219C1.63242 42.0002 0 40.3677 0 38.358C0 36.6517 1.18945 35.1752 2.85469 34.806L6.93984 33.8955C10.0242 33.2064 12.641 31.172 14.052 28.3419H14.0437Z" fill="currentColor"/>
    </g>
    <defs>
    <clipPath id="clip0_8_3380">
    <rect width="42" height="42" fill="white"/>
    </clipPath>
    </defs>
    </svg>
    
}

function Path(color){
    return <svg  style={{ color: color }} width="62" height="52" viewBox="0 0 62 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_8_3411)">
    <path d="M6.92871 30.4987C11.558 21.7774 17.6969 17.9238 25.3453 18.9379C35.4091 20.1548 39.9378 15.997 38.9314 6.46436" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>
    <path d="M23.8511 47.2832C28.4804 38.5618 34.6193 34.7082 42.2677 35.7223C52.3314 36.9393 56.8601 32.7814 55.8537 23.2488" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>
    <path d="M24.011 36.982C25.3449 36.982 26.4263 35.8923 26.4263 34.5481C26.4263 33.2039 25.3449 32.1143 24.011 32.1143C22.6771 32.1143 21.5957 33.2039 21.5957 34.5481C21.5957 35.8923 22.6771 36.982 24.011 36.982Z" fill="currentColor" stroke="currentColor" stroke-width="1.6"/>
    <path d="M17.0491 29.5921C18.383 29.5921 19.4644 28.5024 19.4644 27.1582C19.4644 25.814 18.383 24.7244 17.0491 24.7244C15.7152 24.7244 14.6338 25.814 14.6338 27.1582C14.6338 28.5024 15.7152 29.5921 17.0491 29.5921Z" fill="currentColor" stroke="currentColor" stroke-width="1.6"/>
    <path d="M24.5032 26.8721C25.8371 26.8721 26.9185 25.7824 26.9185 24.4383C26.9185 23.0941 25.8371 22.0044 24.5032 22.0044C23.1693 22.0044 22.0879 23.0941 22.0879 24.4383C22.0879 25.7824 23.1693 26.8721 24.5032 26.8721Z" fill="currentColor" stroke="currentColor" stroke-width="1.6"/>
    <path d="M32.3284 26.7476C33.6623 26.7476 34.7437 25.6579 34.7437 24.3137C34.7437 22.9696 33.6623 21.8799 32.3284 21.8799C30.9945 21.8799 29.9131 22.9696 29.9131 24.3137C29.9131 25.6579 30.9945 26.7476 32.3284 26.7476Z" fill="currentColor" stroke="currentColor" stroke-width="1.6"/>
    <path d="M31.0515 34.1221C32.3855 34.1221 33.4668 33.0324 33.4668 31.6883C33.4668 30.3441 32.3855 29.2544 31.0515 29.2544C29.7176 29.2544 28.6362 30.3441 28.6362 31.6883C28.6362 33.0324 29.7176 34.1221 31.0515 34.1221Z" fill="currentColor" stroke="currentColor" stroke-width="1.6"/>
    <path d="M38.6297 32.8353C39.9636 32.8353 41.0449 31.7456 41.0449 30.4014C41.0449 29.0572 39.9636 27.9675 38.6297 27.9675C37.2957 27.9675 36.2144 29.0572 36.2144 30.4014C36.2144 31.7456 37.2957 32.8353 38.6297 32.8353Z" fill="currentColor" stroke="currentColor" stroke-width="1.6"/>
    <path d="M47.7503 31.8069C49.0842 31.8069 50.1656 30.7173 50.1656 29.3731C50.1656 28.0289 49.0842 26.9392 47.7503 26.9392C46.4163 26.9392 45.335 28.0289 45.335 29.3731C45.335 30.7173 46.4163 31.8069 47.7503 31.8069Z" fill="currentColor" stroke="currentColor" stroke-width="1.6"/>
    <path d="M40.6917 24.3106C42.0256 24.3106 43.107 23.2209 43.107 21.8767C43.107 20.5325 42.0256 19.4429 40.6917 19.4429C39.3577 19.4429 38.2764 20.5325 38.2764 21.8767C38.2764 23.2209 39.3577 24.3106 40.6917 24.3106Z" fill="currentColor" stroke="currentColor" stroke-width="1.6"/>
    <path d="M43.907 16.5557C45.2409 16.5557 46.3223 15.466 46.3223 14.1219C46.3223 12.7777 45.2409 11.688 43.907 11.688C42.5731 11.688 41.4917 12.7777 41.4917 14.1219C41.4917 15.466 42.5731 16.5557 43.907 16.5557Z" fill="currentColor" stroke="currentColor" stroke-width="1.6"/>
    <path d="M49.6858 22.8929C51.0197 22.8929 52.1011 21.8032 52.1011 20.459C52.1011 19.1148 51.0197 18.0251 49.6858 18.0251C48.3519 18.0251 47.2705 19.1148 47.2705 20.459C47.2705 21.8032 48.3519 22.8929 49.6858 22.8929Z" fill="currentColor" stroke="currentColor" stroke-width="1.6"/>
    <path d="M12.6892 37.2283C14.0232 37.2283 15.1045 36.1386 15.1045 34.7945C15.1045 33.4503 14.0232 32.3606 12.6892 32.3606C11.3553 32.3606 10.2739 33.4503 10.2739 34.7945C10.2739 36.1386 11.3553 37.2283 12.6892 37.2283Z" fill="currentColor" stroke="currentColor" stroke-width="1.6"/>
    <path d="M20.5237 43.9581C21.8576 43.9581 22.939 42.8684 22.939 41.5242C22.939 40.18 21.8576 39.0903 20.5237 39.0903C19.1898 39.0903 18.1084 40.18 18.1084 41.5242C18.1084 42.8684 19.1898 43.9581 20.5237 43.9581Z" fill="currentColor" stroke="currentColor" stroke-width="1.6"/>
    </g>
    <defs>
    <clipPath id="clip0_8_3411">
    <rect width="62" height="52" fill="white"/>
    </clipPath>
    </defs>
    </svg>
    
}

function Lemon(color) {
    return <svg style={{ color: color }} width="36" height="41" viewBox="0 0 36 41" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M36 7.6875C36 4.86074 33.6937 2.5625 30.8571 2.5625C30.3268 2.5625 29.8125 2.64258 29.3304 2.79473C27.5223 3.35527 25.4652 3.98789 23.625 3.51543C17.5821 1.98594 11.0571 4.39629 6.45268 8.98477C1.84821 13.5732 -0.578571 20.0836 0.95625 26.1055C1.42232 27.9393 0.795536 29.9813 0.233036 31.791C0.0803571 32.2715 0 32.784 0 33.3125C0 36.1393 2.30625 38.4375 5.14286 38.4375C5.67321 38.4375 6.1875 38.3574 6.67768 38.2053C8.48571 37.6447 10.5429 37.0121 12.383 37.4846C18.4259 39.0141 24.9509 36.6037 29.5554 32.0152C34.1598 27.4268 36.5866 20.9244 35.0438 14.9025C34.5777 13.0688 35.2045 11.0268 35.767 9.21699C35.9196 8.73652 36 8.22402 36 7.6875ZM17.0759 10.202C12.6884 11.4832 8.95179 15.2068 7.66607 19.5791C7.46518 20.2598 6.75 20.6441 6.06696 20.452C5.38393 20.2598 4.99821 19.5391 5.19107 18.8584C6.72589 13.6453 11.1134 9.26504 16.3527 7.73555C17.0357 7.53535 17.7509 7.92773 17.9518 8.6084C18.1527 9.28906 17.7589 10.0018 17.0759 10.202Z" fill="currentColor"/>
    </svg>
    
}

function Apple(color) {
    return <svg style={{ color: color }} width="37" height="42" viewBox="0 0 37 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_8_3374)">
            <path d="M18.5 9.1875C17.7732 9.1875 17.1786 8.59688 17.1786 7.875V6.5625C17.1786 2.93672 20.1353 0 23.7857 0H25.1071C25.8339 0 26.4286 0.590625 26.4286 1.3125V2.625C26.4286 6.25078 23.4719 9.1875 19.8214 9.1875H18.5ZM0 23.625C0 17.366 2.94844 10.5 9.25 10.5C11.5047 10.5 14.1806 11.3449 16.0801 12.0832C17.6328 12.682 19.3754 12.682 20.9281 12.0832C22.8194 11.3531 25.5036 10.5 27.7583 10.5C34.0598 10.5 37.0083 17.366 37.0083 23.625C37.0083 34.125 30.4011 42 23.794 42C22.4312 42 20.6473 41.4586 19.5406 41.073C18.8717 40.8434 18.1449 40.8434 17.4759 41.073C16.3692 41.4586 14.5853 42 13.2225 42C6.60714 42 0 34.125 0 23.625Z" fill="currentColor" />
        </g>
        <defs>
            <clipPath id="clip0_8_3374">
                <rect width="37" height="42" fill="white" />
            </clipPath>
        </defs>
    </svg>

}


function Carrot(color) {
    return <svg style={{ color: color }} width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_8_3378)">
            <path d="M33.18 0.574219C32.3091 1.62695 30.6247 4.04824 30.6247 6.89062C30.6247 10.7188 32.089 12.183 34.4528 14.5469C36.8167 16.9107 38.2809 18.375 42.1091 18.375C44.9515 18.375 47.3727 16.6906 48.4255 15.8197C48.8083 15.5039 48.9997 15.035 48.9997 14.5469C48.9997 14.0588 48.8083 13.5898 48.4255 13.2836C47.3345 12.4127 44.76 10.7188 41.3434 10.7188C38.2809 10.7188 37.5153 11.4844 37.5153 11.4844C37.5153 11.4844 38.2809 10.7188 38.2809 7.65625C38.2809 4.23965 36.587 1.66523 35.7161 0.574219C35.4099 0.191406 34.9409 0 34.4528 0C33.9647 0 33.4958 0.191406 33.18 0.574219ZM23.4087 13.0156C19.5806 13.0156 16.03 14.7479 13.6757 17.6285L19.4657 23.4186C20.0591 24.0119 20.0591 24.9881 19.4657 25.5814C18.8724 26.1748 17.8962 26.1748 17.3028 25.5814L12.0104 20.2891V20.2986L0.210245 45.7365C-0.191708 46.6074 -0.00987238 47.641 0.66962 48.3301C1.34911 49.0191 2.38271 49.1914 3.26317 48.7895L16.1544 42.8176L11.1683 37.8314C10.5749 37.2381 10.5749 36.2619 11.1683 35.6686C11.7616 35.0752 12.7378 35.0752 13.3311 35.6686L19.1116 41.4395L28.7011 36.9988C33.1417 34.9412 35.9936 30.491 35.9936 25.591C35.9841 18.643 30.3567 13.0156 23.4087 13.0156Z" fill="currentColor" />
        </g>
        <defs>
            <clipPath id="clip0_8_3378">
                <rect width="49" height="49" fill="white" />
            </clipPath>
        </defs>
    </svg>
}


function Rose(color) {
    return (
        <svg style={{ color: color }} width="50" height="51" viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M35.8362 7.57361C35.7246 7.39598 35.5607 7.25732 35.367 7.17672C35.1734 7.09613 34.9595 7.07757 34.7549 7.12359C33.5734 7.38917 32.4059 7.69404 31.2859 8.0249C29.0637 8.68344 26.8916 9.54101 24.4501 10.7244C23.2699 11.298 22.8021 11.5705 21.4077 12.3806L21.1225 12.5498C19.034 13.7541 17.504 15.0851 16.4455 16.6247C15.2837 18.3107 14.6948 20.2825 14.6948 22.4781C14.6948 25.0603 15.6906 27.3649 17.4989 28.9666C19.3218 30.5835 21.8609 31.4379 24.8361 31.4379C27.7999 31.4379 30.3434 30.5296 32.1885 28.8119C33.9854 27.1418 34.9773 24.7941 34.9773 22.2017C34.9773 20.6172 34.585 19.2227 34.206 17.8778C33.408 15.0452 32.719 12.5986 35.7721 8.74239C35.9023 8.57808 35.9783 8.37747 35.9898 8.16817C36.0013 7.95887 35.9476 7.75116 35.8362 7.57361Z" fill="currentColor" />
            <path d="M22.4907 7.57751C19.2874 5.83639 15.0407 5.11446 14.8613 5.08467C14.628 5.04638 14.3885 5.09087 14.1845 5.21043C13.9804 5.32999 13.8246 5.5171 13.7439 5.73941C13.6813 5.92213 13.6706 6.11864 13.713 6.30708C13.7554 6.49553 13.8492 6.66851 13.9841 6.80678C16.0022 8.94785 16.0669 11.1669 15.8 13.4385C15.7931 13.497 15.8046 13.5562 15.833 13.6078C15.8615 13.6595 15.9053 13.7009 15.9585 13.7263C16.0114 13.7515 16.0709 13.7595 16.1286 13.7493C16.1863 13.7391 16.2394 13.7111 16.2805 13.6692C17.3193 12.6228 18.5857 11.6714 20.1088 10.7923L20.3927 10.6275C21.7935 9.81176 22.3152 9.50752 23.5682 8.89968L23.7387 8.81728C23.7782 8.79836 23.8121 8.76953 23.8371 8.73361C23.8622 8.69769 23.8775 8.6559 23.8816 8.61231C23.8856 8.56872 23.8784 8.52482 23.8605 8.48487C23.8425 8.44493 23.8146 8.41031 23.7793 8.38438C23.3683 8.08685 22.9378 7.81729 22.4907 7.57751Z" fill="currentColor" />
            <path d="M23.4578 5.79646C23.6758 5.91499 23.9071 6.04999 24.1486 6.19514C24.8183 6.6057 25.4461 7.08103 26.0229 7.61428C26.0586 7.64761 26.1033 7.66989 26.1514 7.67843C26.1995 7.68698 26.2491 7.68143 26.2941 7.66245C27.7355 7.05358 29.2092 6.52459 30.7088 6.07788C31.0045 5.99042 31.302 5.9059 31.6012 5.82435C31.6372 5.81446 31.6705 5.79675 31.6989 5.77248C31.7272 5.74822 31.7498 5.71799 31.7652 5.68397C31.7805 5.64994 31.7881 5.61296 31.7875 5.57565C31.7868 5.53834 31.778 5.50163 31.7615 5.46814C31.2374 4.40141 30.8317 3.63638 30.8013 3.57997C30.7149 3.41765 30.5859 3.28189 30.4283 3.18722C30.2706 3.09254 30.0902 3.04251 29.9063 3.04248C29.7853 3.04248 27.797 3.0653 25.0341 4.39253C24.4604 4.66876 23.902 4.97577 23.3614 5.31222C23.3234 5.33562 23.2922 5.36866 23.271 5.40799C23.2498 5.44733 23.2394 5.49155 23.2408 5.5362C23.2423 5.58085 23.2555 5.62433 23.2791 5.66224C23.3027 5.70015 23.3359 5.73115 23.3754 5.7521L23.4578 5.79646Z" fill="currentColor" />
            <path d="M21.8777 3.85292C22.3404 3.55058 22.812 3.26853 23.288 3.00929C23.3067 2.99913 23.3225 2.98443 23.334 2.96655C23.3455 2.94867 23.3524 2.92818 23.3539 2.90697C23.3554 2.88576 23.3515 2.86451 23.3427 2.84517C23.3338 2.82584 23.3203 2.80904 23.3032 2.79633C21.6553 1.55593 20.1512 1.08499 20.0612 1.05837C19.8603 0.997031 19.6453 0.999577 19.446 1.06565C19.2466 1.13173 19.0727 1.25808 18.9482 1.42726C18.4823 2.07475 18.0734 2.76144 17.7262 3.47959C17.718 3.49645 17.7136 3.51491 17.7134 3.53365C17.7132 3.55239 17.7171 3.57095 17.7249 3.58798C17.7328 3.60502 17.7443 3.6201 17.7586 3.63216C17.773 3.64422 17.7898 3.65294 17.8079 3.6577C18.6706 3.88398 19.6714 4.18314 20.6988 4.56344C20.7174 4.57035 20.7374 4.5728 20.7571 4.5706C20.7768 4.5684 20.7957 4.5616 20.8123 4.55076L21.8777 3.85292Z" fill="currentColor" />
            <g clip-path="url(#clip0_8_3384)">
                <path d="M25.1665 46.2497C35.3155 46.2497 43.5449 38.0202 43.5449 27.8713C33.396 27.8713 25.1665 36.1007 25.1665 46.2497ZM12.0974 22.2556C12.0974 25.0737 14.3845 27.3608 17.2025 27.3608C18.2848 27.3608 19.265 27.034 20.1022 26.4623L20.0614 26.8502C20.0614 29.6683 22.3485 31.9554 25.1665 31.9554C27.9845 31.9554 30.2716 29.6683 30.2716 26.8502L30.2308 26.4623C31.0476 27.034 32.0482 27.3608 33.1305 27.3608C35.9485 27.3608 38.2356 25.0737 38.2356 22.2556C38.2356 20.2136 37.0308 18.4779 35.3155 17.661C37.0308 16.8442 38.2356 15.1085 38.2356 13.0664C38.2356 10.2484 35.9485 7.96131 33.1305 7.96131C32.0482 7.96131 31.068 8.28803 30.2308 8.85981L30.2716 8.47182C30.2716 5.65379 27.9845 3.3667 25.1665 3.3667C22.3485 3.3667 20.0614 5.65379 20.0614 8.47182L20.1022 8.85981C19.2854 8.28803 18.2848 7.96131 17.2025 7.96131C14.3845 7.96131 12.0974 10.2484 12.0974 13.0664C12.0974 15.1085 13.3022 16.8442 15.0175 17.661C13.3022 18.4779 12.0974 20.2136 12.0974 22.2556ZM25.1665 12.5559C27.9845 12.5559 30.2716 14.843 30.2716 17.661C30.2716 20.4791 27.9845 22.7662 25.1665 22.7662C22.3485 22.7662 20.0614 20.4791 20.0614 17.661C20.0614 14.843 22.3485 12.5559 25.1665 12.5559ZM6.78809 27.8713C6.78809 38.0202 15.0175 46.2497 25.1665 46.2497C25.1665 36.1007 16.9371 27.8713 6.78809 27.8713Z" fill="currentColor" />
            </g>
            <g clip-path="url(#clip1_8_3384)">
                <path d="M25.167 46.2497C35.316 46.2497 43.5454 38.0202 43.5454 27.8713C33.3965 27.8713 25.167 36.1007 25.167 46.2497ZM12.0979 22.2556C12.0979 25.0737 14.385 27.3608 17.203 27.3608C18.2853 27.3608 19.2655 27.034 20.1027 26.4623L20.0619 26.8502C20.0619 29.6683 22.349 31.9554 25.167 31.9554C27.985 31.9554 30.2721 29.6683 30.2721 26.8502L30.2313 26.4623C31.0481 27.034 32.0487 27.3608 33.131 27.3608C35.949 27.3608 38.2361 25.0737 38.2361 22.2556C38.2361 20.2136 37.0313 18.4779 35.316 17.661C37.0313 16.8442 38.2361 15.1085 38.2361 13.0664C38.2361 10.2484 35.949 7.96131 33.131 7.96131C32.0487 7.96131 31.0685 8.28803 30.2313 8.85981L30.2721 8.47182C30.2721 5.65379 27.985 3.3667 25.167 3.3667C22.349 3.3667 20.0619 5.65379 20.0619 8.47182L20.1027 8.85981C19.2859 8.28803 18.2853 7.96131 17.203 7.96131C14.385 7.96131 12.0979 10.2484 12.0979 13.0664C12.0979 15.1085 13.3027 16.8442 15.018 17.661C13.3027 18.4779 12.0979 20.2136 12.0979 22.2556ZM25.167 12.5559C27.985 12.5559 30.2721 14.843 30.2721 17.661C30.2721 20.4791 27.985 22.7662 25.167 22.7662C22.349 22.7662 20.0619 20.4791 20.0619 17.661C20.0619 14.843 22.349 12.5559 25.167 12.5559ZM6.78857 27.8713C6.78857 38.0202 15.018 46.2497 25.167 46.2497C25.167 36.1007 16.9375 27.8713 6.78857 27.8713Z" fill="currentColor" />
            </g>
            <g clip-path="url(#clip2_8_3384)">
                <path d="M24.5044 45.5873C34.6534 45.5873 42.8828 37.3579 42.8828 27.2089C32.7339 27.2089 24.5044 35.4384 24.5044 45.5873ZM11.4353 21.5933C11.4353 24.4113 13.7224 26.6984 16.5404 26.6984C17.6227 26.6984 18.6029 26.3717 19.4401 25.7999L19.3993 26.1879C19.3993 29.0059 21.6864 31.293 24.5044 31.293C27.3224 31.293 29.6095 29.0059 29.6095 26.1879L29.5687 25.7999C30.3855 26.3717 31.3861 26.6984 32.4684 26.6984C35.2864 26.6984 37.5735 24.4113 37.5735 21.5933C37.5735 19.5512 36.3687 17.8155 34.6534 16.9987C36.3687 16.1819 37.5735 14.4461 37.5735 12.4041C37.5735 9.58605 35.2864 7.29895 32.4684 7.29895C31.3861 7.29895 30.4059 7.62568 29.5687 8.19745L29.6095 7.80946C29.6095 4.99144 27.3224 2.70435 24.5044 2.70435C21.6864 2.70435 19.3993 4.99144 19.3993 7.80946L19.4401 8.19745C18.6233 7.62568 17.6227 7.29895 16.5404 7.29895C13.7224 7.29895 11.4353 9.58605 11.4353 12.4041C11.4353 14.4461 12.6401 16.1819 14.3554 16.9987C12.6401 17.8155 11.4353 19.5512 11.4353 21.5933ZM24.5044 11.8936C27.3224 11.8936 29.6095 14.1807 29.6095 16.9987C29.6095 19.8167 27.3224 22.1038 24.5044 22.1038C21.6864 22.1038 19.3993 19.8167 19.3993 16.9987C19.3993 14.1807 21.6864 11.8936 24.5044 11.8936ZM6.12598 27.2089C6.12598 37.3579 14.3554 45.5873 24.5044 45.5873C24.5044 35.4384 16.275 27.2089 6.12598 27.2089Z" fill="currentColor" />
            </g>
            <defs>
                <clipPath id="clip0_8_3384">
                    <rect width="49.0091" height="17.8817" fill="white" transform="translate(0.662109 32.4521)" />
                </clipPath>
                <clipPath id="clip1_8_3384">
                    <rect width="18.544" height="22.5177" fill="white" transform="translate(31.1274 27.8162)" />
                </clipPath>
                <clipPath id="clip2_8_3384">
                    <rect width="19.2063" height="22.5177" fill="white" transform="translate(0 27.1538)" />
                </clipPath>
            </defs>
        </svg>

    )
}