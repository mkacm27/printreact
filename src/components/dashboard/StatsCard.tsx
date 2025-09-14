import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const StyledTouchableOpacity = styled(TouchableOpacity);

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: number;
  className?: string;
  onPress?: () => void;
}

const StatsCard = ({
  title,
  value,
  description,
  icon,
  trend,
  className,
  onPress,
}: StatsCardProps) => {
  return (
    <StyledTouchableOpacity onPress={onPress} activeOpacity={onPress ? 0.8 : 1}>
        <Card 
          className={cn("overflow-hidden", className)}
        >
          <CardHeader className="flex-row items-center justify-between pb-2">
            <View className="space-y-1">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {title}
              </CardTitle>
            </View>
            {icon && (
              <View className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                {icon}
              </View>
            )}
          </CardHeader>
          <CardContent className="pb-3">
            <Text className="text-2xl font-bold text-foreground">{value}</Text>
            {description && (
              <CardDescription className="text-xs text-muted-foreground">
                {description}
              </CardDescription>
            )}
            {typeof trend === 'number' && (
              <View className={cn(
                "flex-row items-center mt-2",
              )}>
                <Text className={cn(
                    "text-xs font-medium",
                    trend > 0 ? "text-green-500" : trend < 0 ? "text-red-500" : "text-gray-500"
                )}>
                    {trend > 0 ? '↑' : trend < 0 ? '↓' : '→'} {Math.abs(trend)}% from last period
                </Text>
              </View>
            )}
          </CardContent>
        </Card>
    </StyledTouchableOpacity>
  )
}

export default StatsCard;
