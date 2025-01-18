import React from 'react'
import fruit from '@/assets/fruit.png'
import happi from '@/assets/happi.png'
import { Box, Image, Text } from '@chakra-ui/react'

export default function HomePage() {
  return (
    <div>
      <Box className="relative">
        <Image
          // position={'absolute'}
          // left="0px"
          src={happi}
          width={150}
          // zIndex={5}
        />
        <Image
          position={'relative'}
          // top={'100px'}
          // left={'12px'}
          src={fruit}
          width={140}
          transform={'translateY(-89px)'}
        />
      </Box>
      {/* <Text>HomePage</Text> */}
    </div>
  )
}
