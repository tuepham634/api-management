import { Request, Response, NextFunction } from 'express';

export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Email không hợp lệ' });
    return;
  }

  // Validate password length
  if (password.length < 6) {
    res.status(400).json({ message: 'Mật khẩu phải có ít nhất 6 ký tự' });
    return;
  }

  // Validate name length
  if (name.trim().length < 2) {
    res.status(400).json({ message: 'Tên phải có ít nhất 2 ký tự' });
    return;
  }

  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Vui lòng điền email và mật khẩu' });
    return;
  }

  next();
};

export const validateChangePassword = (req: Request, res: Response, next: NextFunction): void => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    res.status(400).json({ message: 'Vui lòng cung cấp mật khẩu hiện tại và mật khẩu mới' });
    return;
  }

  if (newPassword.length < 6) {
    res.status(400).json({ message: 'Mật khẩu mới phải có ít nhất 6 ký tự' });
    return;
  }

  next();
};

export const validateResetPassword = (req: Request, res: Response, next: NextFunction): void => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    res.status(400).json({ message: 'Vui lòng cung cấp token và mật khẩu mới' });
    return;
  }

  if (newPassword.length < 6) {
    res.status(400).json({ message: 'Mật khẩu mới phải có ít nhất 6 ký tự' });
    return;
  }

  next();
};

export const validateForgotPassword = (req: Request, res: Response, next: NextFunction): void => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: 'Vui lòng nhập email' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Email không hợp lệ' });
    return;
  }

  next();
};
