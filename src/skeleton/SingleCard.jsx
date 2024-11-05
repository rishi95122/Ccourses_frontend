import React from 'react';
import { Card, CardContent, Skeleton, Box } from '@mui/material';

const CourseCardSkeleton = ({width=230}) => {
  return (
    <Card sx={{ width: width, backgroundColor: '#1a1a2e', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Skeleton for the image */}
        <Skeleton variant="rectangular" width="100%" height={140} sx={{ bgcolor: 'grey.500', mt: 2, borderRadius: 1 }} />
      </Box>
      
      {/* Skeleton for the content */}
      <CardContent>
        {/* Skeleton for the title */}
        <Skeleton variant="text" width="80%" height={30} sx={{ bgcolor: 'grey.700', mb: 1 }} />
        
        {/* Skeleton for the subtitle */}
        <Skeleton variant="text" width="40%" height={20} sx={{ bgcolor: 'grey.700' }} />
      </CardContent>
    </Card>
  );
}

export default CourseCardSkeleton;
